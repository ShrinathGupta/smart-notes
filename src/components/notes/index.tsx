import { List } from "./list";
import { useContainer } from '../../container';

export const Notes = () => {
  const {onSearch, onCreate, onDelete, notes} = useContainer();
  return (
    <div className="SplitPane-left list-group">
      <input className="input" type="search" id="search" name="search" placeholder="Search" onKeyUp={(e)=>onSearch(e)} onKeyPress={(e)=>onSearch(e)} onKeyDown={(e)=>onSearch(e)}/>
      <div>
        <span className="create" onClick={() => onCreate()}>
          &#x2b;
        </span>
        <span className="delete" onClick={() => onDelete()}>
          <i className="fa fa-trash"></i>
        </span>
      </div>
      <br />
      <List notes={notes}/>
    </div>
  );
};
