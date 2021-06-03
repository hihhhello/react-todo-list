import Header from "./Header";
import ToDoListTable from "./ToDoListTable";
import AddTaskBar from "./AddTaskBar";

import "./_app.sass"

function App() {
  return (
    <div className="app">
      <Header />
      <div className="todo-list__wrapper">
        <ToDoListTable />
        <AddTaskBar />
      </div>
    </div>
  );
}

export default App;
