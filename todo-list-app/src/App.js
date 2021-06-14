import React from "react";
import Header from "./Header";
import ToDoListTable from "./ToDoListTable";
import ErrorBoundary from "./ErrorBoundary";
import SyncTable from "./SyncTable";
import Secret from "./Secret";

import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { ThemeContext, themes } from "./theme-context";

import "./_app.sass";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }
  render() {
    return (
      <div className="app">
        <ThemeContext.Provider value={this.state}>
          <ErrorBoundary>
            <Router>
              <Header />
              <Switch>
                <div className="app__content">
                  <Route path="/home" exact>
                    <ToDoListTable />
                  </Route>
                  <Route path="/sync-table" exact>
                    <SyncTable />
                  </Route>
                </div>
                <Route path="/secret" exact>
                  <Secret />
                </Route>
                <Redirect to="/home" exact />
              </Switch>
            </Router>
          </ErrorBoundary>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
