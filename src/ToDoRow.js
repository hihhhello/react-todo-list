import "./_todo-row.sass"
function ToDoRow({ isDone, descr, onClick, id }) {
    const {chbPath, chbAlt} = isDone ? {chbPath: "/icons/checkbox-checked.svg", chbAlt: "done"}
    : {chbPath: "/icons/checkbox.svg", chbAlt: "not done"};
    const descrClass = isDone ? "todo-row__descr todo-row__descr_checked" : "todo-row__descr";

    return(
        <div className="todo-row">
            <div className="container">
                <div className="todo-row__wrapper">
                    <div className="todo-row__btns">
                        <div onClick={e => onClick(id, e)} className="todo-row__btn todo-row__btn_delete">
                            <img data-row-btn={"delete"} src={"/icons/delete.svg"} alt={"delete"} />
                        </div>
                        <div
                            onClick={e => onClick(id, e)}
                            className="todo-row__btn todo-row__btn_check">
                            <img data-row-btn={"check"} src={chbPath} alt={chbAlt}/>
                        </div>
                    </div>
                    <div className={descrClass}>
                        {descr}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ToDoRow;