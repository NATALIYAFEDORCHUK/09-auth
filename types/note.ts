export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;

}

export type NoteTag =  "All" | "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | "Ideas" | "Travel" | "Finance" | "Health" | "Important";

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
}