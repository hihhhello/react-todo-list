import React from "react";
import Header from "../Header";
import ToDoListPage from "../../pages/ToDoListPage";
import ErrorBoundary from "../ErrorBoundary";
import SyncTablePage from "../../pages/SyncTablePage";
// import SecretPage from "../../pages/SecretPage";

import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { ThemeContext, themes } from "../../context/theme-context";

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
    const contentClass =
      this.state.theme === themes.dark
        ? "app__content app__content_dark"
        : "app__content";
    return (
      <div className="app">
        <ThemeContext.Provider value={this.state}>
          <Router basename="/react-app">
            <Header />
            <div className={contentClass}>
              <Switch>
                <Route path="/" exact>
                  <ErrorBoundary>
                    <ToDoListPage />
                  </ErrorBoundary>
                </Route>
                <Route path="/sync-table" exact>
                  <SyncTablePage />
                </Route>
                <Route path="/secret" exact>
                  {/* <SecretPage /> */}
                </Route>
                <Redirect to="/" exact />
              </Switch>
            </div>
          </Router>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
