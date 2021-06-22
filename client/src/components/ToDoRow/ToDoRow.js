import "./_todo-row.sass";
function ToDoRow({ status, title, onStatus, id, descr }) {
  const titleClass = status
    ? "todo-row__title todo-row__title_checked"
    : "todo-row__title";

  return (
    <div className="todo-row">
      <div className="container">
        <div className="todo-row__wrapper">
          <div className="todo-row__btns">
            <div
              onClick={(e) => onStatus(id, e)}
              className="todo-row__btn todo-row__btn_delete"
            >
              <img
                data-row-btn={"delete"}
                src={"./icons/delete.svg"}
                alt={"delete"}
              />
            </div>
            <div
              onClick={(e) => onStatus(id, e)}
              className={`todo-row__btn todo-row__btn_check${
                status ? " active" : ""
              }`}
            >
              {!status ? null : (
                <img
                  data-row-btn={"check"}
                  src={"./icons/tick.svg"}
                  alt={"done"}
                />
              )}
            </div>
          </div>
          <div className={titleClass}>{title}</div>
          <div className="todo-row__descr">{descr}</div>
        </div>
      </div>
    </div>
  );
}

export default ToDoRow;
