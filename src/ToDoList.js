import ToDoRow from "./ToDoRow";
import "./_todo-list.sass";
function ToDoList() {
    return(
        <div className="todo-list">
            <div className="container">
                <div className="todo-list__wrapper">
                    <div className="todo-list__items">
                        <ToDoRow isChecked descr={"Vanilla JavaScript"}/>
                        <ToDoRow isChecked descr={"Vue.js"}/>
                        <ToDoRow isChecked={false} descr={"React.js"}/>
                        <ToDoRow isChecked={false} descr={"Node.js"}/>
                    </div>
                    <div className="todo-list__clear">Clear</div>
                </div>
            </div>
        </div>
    )
};

export default ToDoList;