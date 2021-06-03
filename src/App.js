import Header from "./Header";
import ToDoListTable from "./ToDoListTable";

import "./_app.sass"

function App() {
  return (
    <div className="app">
      <Header />
      <ToDoListTable />
    </div>
  );
}

export default App;
