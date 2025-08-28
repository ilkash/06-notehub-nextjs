import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetails() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["dateils", { id: "" }],
    queryFn: () => fetchNoteById(""),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
