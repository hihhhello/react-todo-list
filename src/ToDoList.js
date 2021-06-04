import ToDoRow from "./ToDoRow";
import {idGenerator} from "./services";
import "./_todo-list.sass";
function ToDoList({ todoList }) {
    const ids = idGenerator();
    return(
        <div className="todo-list">
            <div className="container">
                <div className="todo-list__wrapper">
                    <div className="todo-list__items">
                        {/* <ToDoRow isChecked descr={"Vanilla JavaScript"}/>
                        <ToDoRow isChecked descr={"Vue.js"}/>
                        <ToDoRow isChecked={false} descr={"React.js"}/>
                        <ToDoRow isChecked={false} descr={"Node.js"}/> */}
                        {
                            todoList.map(({descr, isDone}) => 
                            { 
                                return <ToDoRow key={ids.next().value} isDone={isDone} descr={descr} />;
                            })
                        }
                    </div>
                    <div className="todo-list__clear">Clear</div>
                </div>
            </div>
        </div>
    )
};

export default ToDoList;