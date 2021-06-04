import "./_todo-row.sass"
function ToDoRow({ isDone, descr }) {
    const checkBox = isDone ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5C0 2.23858 2.23858 0 5 0H13C15.7614 0 18 2.23858 18 5V13C18 15.7614 15.7614 18 13 18H5C2.23858 18 0 15.7614 0 13V5Z" fill="#D3D3D3"/>
    <path d="M4 9L8 15L14 3" stroke="black"/>
    </svg>
    :
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="5" fill="#D3D3D3"/>
    </svg>;
    const descrClass = isDone ? "todo-row__descr todo-row__descr_checked" : "todo-row__descr";

    return(
        <div className="todo-row">
            <div className="container">
                <div className="todo-row__wrapper">
                    <div className="todo-row__btns">
                        <div className="todo-row__btn todo-row__btn_delete">
                            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="25" rx="5" fill="#FD4B4B"/>
                                <path d="M4 19L16 7M4 7L16 19" stroke="white"/>
                            </svg>
                        </div>
                        <div className="todo-row__btn todo-row__btn_check">
                            {checkBox}
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