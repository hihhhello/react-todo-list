import Header from "./Header";
import ToDoListTable from "./ToDoListTable";
import ErrorBoundary from "./ErrorBoundary";

import "./_app.sass"

function App() {
  return (
    <div className="app">
      <Header />
      <ErrorBoundary>
        <ToDoListTable />
      </ErrorBoundary>
    </div>
  );
}

export default App;
