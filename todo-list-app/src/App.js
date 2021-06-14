import React from "react";
import Header from "./Header";
import ToDoListTable from "./ToDoListTable";
import ErrorBoundary from "./ErrorBoundary";

import { ThemeContext, themes } from "./theme-context";

import "./_app.sass"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: 
          state.theme === themes.dark 
            ? themes.light 
            : themes.dark
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    }

  }
  render() {
    return (
      <div className="app">
        <ThemeContext.Provider value={this.state}>
          <Header />
          <ErrorBoundary>
            <ToDoListTable />
          </ErrorBoundary>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
