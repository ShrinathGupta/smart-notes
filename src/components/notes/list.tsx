import "./notes.css";
import { useMemo } from "react";
import { useContainer } from "../../container";

interface InotesData {
  value: {title: string, content: string, tags:[], updatedOn: number}, id?: number, 
}

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "-";
  }
};

export const List = (notes:any) => {
  const {onChange} = useContainer();
  const DataList = () => {
    return useMemo(()=> {
      return notes.notes && notes.notes.map((obj: any) => {
        return (
          <li onClick={() => onChange(obj)} key={obj.id}>
            <strong>{capitalizeFirstLetter(obj.value.title)}</strong>
          </li>
        );
      });
    },[])
  }
  return <div className="notes-section">
    <ul>
    <DataList />
    </ul>
  </div>
};
