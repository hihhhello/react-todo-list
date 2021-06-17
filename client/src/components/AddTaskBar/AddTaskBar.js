import "./_add-task-bar.sass";

function AddTaskBar({ onChange, onAdd, todoTitle }) {
  return (
    <div className="add-task-bar">
      <div className="container">
        <div className="add-task-bar__wrapper">
          <form className="add-task-bar__form">
            <div className="add-task-bar__input">
              <input
                value={todoTitle}
                onChange={(e) => onChange(e.target.value)}
                placeholder="new task"
              />
            </div>
            <button onClick={onAdd} className="add-task-bar__btn">
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTaskBar;
