import ToDoRow from "../ToDoRow";
import Spinner from "../Spinner";
import "./_todo-list.sass";
function ToDoList({ todoList, onClick, onClear, loading }) {
  return (
    <div className="todo-list">
      <div className="container">
        <div className="todo-list__wrapper">
          <div className="todo-list__items">
            {loading
              ? <Spinner />
              : todoList.map(({ title, status, id }) => {
                  return (
                    <ToDoRow
                      key={id}
                      id={id}
                      status={status}
                      title={title}
                      onStatus={onClick}
                    />
                  );
                })}
          </div>
          <button onClick={onClear} className="todo-list__clear">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
