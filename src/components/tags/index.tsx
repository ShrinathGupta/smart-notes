import { useState } from "react";
import { useContainer } from "../../container";
import "./tags.css";
export const Tags = () => {
  const {selectedNote, onUpdateTag} = useContainer();

  const [tags, setTags] = useState(['']);
  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    if(selectedNote.value.title.trim().length && selectedNote.value.content.length) {
    const tags = selectedNote.value.tags ? selectedNote.value.tags : [];
    const finalTags = [...tags, value];
     selectedNote.value.tags = finalTags;
    setTags([...tags, value]);
    onUpdateTag(selectedNote)
    }
    e.target.value = "";
  };
  const deleteTag = (e:any) => {
    const data = tags.filter(o => o !== e.target.parentNode.firstChild.textContent)
    const finalTags = [...data];
     selectedNote.value.tags = finalTags;
    setTags([...data]);
    onUpdateTag(selectedNote)
  }

  return (
    <div className="tags-input-container">
      {selectedNote.value.tags && selectedNote.value.tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={(e) => deleteTag(e)}>&times;</span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder="Enter tags"
      />
    </div>
  );
};
