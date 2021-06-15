import "./_todo-row.sass";
function ToDoRow({ status, title, onClick, id }) {
  const { boxPath, boxAlt } = status
    ? { boxPath: "/icons/checkbox-checked.svg", boxAlt: "done" }
    : { boxPath: "/icons/checkbox.svg", boxAlt: "not done" };
  const titleClass = status
    ? "todo-row__title todo-row__title_checked"
    : "todo-row__title";

  return (
    <div className="todo-row">
      <div className="container">
        <div className="todo-row__wrapper">
          <div className="todo-row__btns">
            <div
              onClick={(e) => onClick(id, e)}
              className="todo-row__btn todo-row__btn_delete"
            >
              <img
                data-row-btn={"delete"}
                src={"/icons/delete.svg"}
                alt={"delete"}
              />
            </div>
            <div
              onClick={(e) => onClick(id, e)}
              className="todo-row__btn todo-row__btn_check"
            >
              <img data-row-btn={"check"} src={boxPath} alt={boxAlt} />
            </div>
          </div>
          <div className={titleClass}>{title}</div>
        </div>
      </div>
    </div>
  );
}

export default ToDoRow;
