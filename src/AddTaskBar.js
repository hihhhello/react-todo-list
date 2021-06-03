import "./_add-task-bar.sass";

function AddTaskBar() {
    return(
        <div className="add-task-bar">
            <div className="container">
                <div className="add-task-bar__wrapper">
                    <form className="add-task-bar__form">
                        <div className="add-task-bar__input">
                            <input placeholder="new task" />
                        </div>
                        <button className="add-task-bar__btn">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddTaskBar;