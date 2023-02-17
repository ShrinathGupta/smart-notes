import { indexedDb } from "../db/connect";

const getNotes = async () => {
  return await indexedDb.getAllValue("notes");
};

const deleteNote = async (id: any) => {
  return await indexedDb.deleteValue("notes", id);
};

const updateNote = async (title: string, notes: string, selectedNote: any) => {
  return await indexedDb.putValue("notes", {
    value: {
      title: title,
      content: notes,
      tags: selectedNote.value.tags,
      updatedOn: new Date().getTime(),
    },
    id: selectedNote.id,
  });
};

export { getNotes, deleteNote, updateNote };
