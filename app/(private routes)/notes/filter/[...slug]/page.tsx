import NotesClient from "./Notes.client";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes list`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes list`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: "note",
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesTag({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag: string = slug[0];
  const initialData = await fetchServerNotes({
    query: "",
    page: 1,
    ...(tag && tag !== "All" && { tag }),
  });

  return <NotesClient initialData={initialData} tag={tag} />;
}
