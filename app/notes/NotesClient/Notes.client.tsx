"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.client.module.css";

export default function NotesClient({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNote, setSearchNote] = useState("");
  const { data } = useQuery({
    queryKey: ["note", { page: currentPage, search: searchNote }],
    queryFn: () => fetchNotes(currentPage, searchNote),
    refetchOnMount: false,
  });

  const updateSearchNote = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchNote(e.target.value);
      setCurrentPage(1);
    },
    300
  );
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={css.app}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onSuccess={closeModal} />
        </Modal>
      )}
      <div className={css.toolbar}>
        <SearchBox value={searchNote} onChange={updateSearchNote} />
        {data && data?.totalPages > 1 && (
          <Pagination
            pageCount={data?.totalPages}
            forcePage={currentPage - 1}
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
