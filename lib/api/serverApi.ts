import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}
export const fetchServerNotes = async ({
  query = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params: Record<string, string | number> = {
    page,
    perPage,
    ...(query !== "" && { query }),
    ...(tag !== undefined ? { tag } : {}),
  };
  if (query.trim()) {
    params.search = query.trim();
  }

  const headers = {
    Cookie: cookieStore.toString(),
  };

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers,
  });

  console.log("cookieStore:", cookieStore.getAll());

  return res.data;
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const { data } = await nextServer.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch user on server:", error);
    return null;
  }
};
export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};
