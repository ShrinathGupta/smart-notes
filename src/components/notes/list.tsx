import "./notes.css";
import { useMemo } from "react";
import { useContainer } from "../../container";

interface InotesData {
  value: { title: string; content: string; tags: []; updatedOn: number };
  id?: number;
}

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "-";
  }
};

export const List = (notes: any) => {
  const { onChange, onDelete } = useContainer();
  const DataList = () => {
    console.log(" Notes List:: ", notes);
    return useMemo(() => {
      return (
        notes.notes &&
        notes.notes.map((obj: InotesData) => {
          return (
            <>
              <li
                className="li-notes"
                onClick={(e) => onChange(obj)}
                key={obj.id}
              >
                <i className="fa fa-sticky-note"> </i> &nbsp;
                <strong>{capitalizeFirstLetter(obj.value.title)}</strong>
                <span className="delete" onClick={() => onDelete()}>
                  <i className="fa fa-trash"></i>
                </span>
              </li>
            </>
          );
        })
      );
    }, []);
  };
  return (
    <div className="notes-section">
      <ul key="data-list">
        <DataList />
      </ul>
    </div>
  );
};
