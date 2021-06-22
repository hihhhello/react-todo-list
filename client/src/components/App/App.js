import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import ToDoListPage from "../../pages/ToDoListPage";
import AuthPage from "../../pages/AuthPage";
import LoginPage from "../../pages/LoginPage";
import ErrorBoundary from "../ErrorBoundary";
import Header from "../Header";

import { ThemeContext, themes } from "../../context/theme-context";
import AuthContext from "../../context/auth-context";
import { useAuth } from "../../hooks/useAuth.hook";

import "./_app.sass";

export const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const { login, logout, userID, token } = useAuth();
  const isAuth = !!token;

  const toggleTheme = () => {
    const themeToSet = theme === themes.dark ? themes.light : themes.dark;
    setTheme(themeToSet);
    localStorage.setItem("theme", themeToSet);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme && localTheme !== theme) {
      setTheme(localTheme);
      return;
    }
  }, [theme]);

  const contentClass =
    theme === themes.dark ? "app__content app__content_dark" : "app__content";
  return (
    <div className="app">
      <AuthContext.Provider value={{ login, logout, userID, token, isAuth }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Router basename="/react-app">
            <Header />
            <div className={contentClass}>
              {isAuth ? (
                <Switch>
                  <Route path="/" exact>
                    <ErrorBoundary>
                      <ToDoListPage />
                    </ErrorBoundary>
                  </Route>
                  <Redirect to="/" />
                </Switch>
              ) : (
                <Switch>
                  <Route path="/" exact>
                    <ErrorBoundary>
                      <AuthPage />
                    </ErrorBoundary>
                  </Route>
                  <Route exact path="/login">
                    <ErrorBoundary>
                      <LoginPage />
                    </ErrorBoundary>
                  </Route>
                  <Redirect to="/" />
                </Switch>
              )}
            </div>
          </Router>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};
