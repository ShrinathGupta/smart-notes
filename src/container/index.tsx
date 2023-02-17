import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { Tags } from "../components/tags";
import { Notes } from "../components/notes";
import { useQueryRequestParam } from "../config/config";
import { deleteNote, getNotes, updateNote } from "../api";

interface InotesData {
  value: { title: string; content: string; tags: string[]; updatedOn: number };
  id?: number;
}
interface IQuery {
  isLoading: boolean;
  error: any;
  data: any;
}

const initData: InotesData = {
  value: {
    title: "",
    content: "",
    tags: [],
    updatedOn: new Date().getTime(),
  },
  id: new Date().getTime(),
};
let context = React.createContext({
  onSearch: (e: any) => {},
  onChange: (data: InotesData) => {},
  onCreate: () => {},
  onDelete: () => {},
  onUpdateTag: (e: InotesData) => {},
  selectedNote: initData,
  notes: [initData],
});

const AppContainer = () => {
  const inputEl = useRef<HTMLTextAreaElement | null>();

  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState([initData]);
  const [selectedNote, setSelectedNote] = useState(initData);

  const identifyTitle = (str: string): string => {
    const identifier = "#";
    if (
      str.indexOf(identifier) >= 0 &&
      str.charAt(str.indexOf(identifier) + 1) !== "#"
    ) {
      return str.substr(
        str.indexOf(identifier) + 1,
        str.indexOf("\n") > 0 ? str.indexOf("\n") : str.length
      );
    }
    return "";
  };

  const onChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNotes(newValue);
  };

  const createNewNote = () => {
    inputEl.current && inputEl.current.focus();
    initData.id = new Date().getTime();
    initData.value.updatedOn = new Date().getTime();
    resetCurrentNote();
  };

  const resetCurrentNote = () => {
    setNotes("");
    setSelectedNote(initData);
  };

  useEffect(() => {
    setNotes(selectedNote.value.content);
  }, [selectedNote]);

  const fetch = async () => {
    const response = await getNotes();
    const sortedArray = response.sort(
      (a: InotesData, b: InotesData) => b.value.updatedOn - a.value.updatedOn
    );
    setNotesList(sortedArray);
    if (sortedArray.length) {
      setSelectedNote(sortedArray[0]);
    } else {
      setSelectedNote(initData);
    }
    return { data: true };
  };
  /**
   * Fetch latest list of notes
   */
  const { isLoading, error, data }: IQuery = useQuery(
    "fetchNotes",
    fetch,
    useQueryRequestParam
  );

  if (isLoading) return <div> Loading... </div>;
  if (error) return <div> Error </div>;

  /**
   * To set new selected note
   */
  const onNewSelection = (data: InotesData) => {
    setSelectedNote(data);
  };

  /**
   * Function is to delete selected note from database.
   */
  const onDelete = async () => {
    setNotes("");
    setNotesList([]);
    await deleteNote(selectedNote.id);
    fetch();
  };

  /**
   * Function is to trigger update on database and fetch latest task list, once user blur text area.
   */
  const onBlur = async () => {
    if (notes.trim().length) {
      updateNote(identifyTitle(notes), notes, selectedNote);
      fetch();
      setSelectedNote({
        value: {
          title: identifyTitle(notes),
          content: notes,
          tags: selectedNote.value.tags,
          updatedOn: new Date().getTime(),
        },
        id: selectedNote.id,
      });
    }
  };

  /**
   * Search notes
   */
  const onSearch = (e: any) => {
    const searchKey = e.target.value.toLowerCase();
    const data = notesList.filter((obj: any) => {
      const s = obj.value.title.toLowerCase();
      const tags = obj.value.tags.join(",");
      return s.includes(searchKey) || tags.includes(searchKey);
    });
    if (data.length && e.target.value.length) {
      setNotesList(data);
    } else {
      fetch();
    }
  };

  const onUpdate = async (data: InotesData) => {
    await updateNote(
      identifyTitle(data.value.content),
      data.value.content,
      data
    );
    fetch();
  };

  return (
    <context.Provider
      value={{
        onSearch: onSearch,
        onChange: onNewSelection,
        onCreate: createNewNote,
        onDelete: onDelete,
        notes: notesList,
        selectedNote: selectedNote,
        onUpdateTag: onUpdate,
      }}
    >
      <div>
        <div className="content">
          <div className="SplitPane">
            <Notes />
            <div className="SplitPane-right">
              <textarea
                ref={(ref) => (inputEl.current = ref)}
                onChange={(e) => onChange(e)}
                value={notes}
                onBlur={(e) => onBlur()}
                placeholder="Write your note here. For Title of the note start string with #, Ex. # Tasks"
              />
              <Tags></Tags>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </context.Provider>
  );
};
const useContainer = () => React.useContext(context);

export { AppContainer, useContainer };
