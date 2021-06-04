import ToDoRow from "./ToDoRow";
import "./_todo-list.sass";
function ToDoList({ todoList, onClick }) {
    return(
        <div className="todo-list">
            <div className="container">
                <div className="todo-list__wrapper">
                    <div className="todo-list__items">
                        {
                            todoList.map(({descr, isDone, id}) => 
                            { 
                                return <ToDoRow 
                                            key={id}
                                            id={id} 
                                            isDone={isDone} 
                                            descr={descr} 
                                            onClick={onClick}
                                            />;
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