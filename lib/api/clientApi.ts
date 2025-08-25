import type { Note, NoteTag } from "../../types/note";
import { User } from "../../types/user";
import { nextServer } from "./api";

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

export const fetchNotes = async ({
  query = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
    ...(tag !== undefined ? { tag } : {}),
  };
  if (query.trim()) {
    params.search = query.trim();
  }

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return res.data;
};

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
