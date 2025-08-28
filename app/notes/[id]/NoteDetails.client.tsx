"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.client.module.css";
export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id ? Number(params.id) : null;
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dateils", { id: id }],
    queryFn: () => fetchNoteById(String(id)),
    enabled: !!id,
  });
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <div>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
