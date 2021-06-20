import React, { useState, useEffect } from "react";
import Header from "../Header";
import ToDoListPage from "../../pages/ToDoListPage";
import ErrorBoundary from "../ErrorBoundary";

import { Redirect, BrowserRouter as Router } from "react-router-dom";

import { ThemeContext, themes } from "../../context/theme-context";

import "./_app.sass";

export const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const themeToSet = theme === themes.dark ? themes.light : themes.dark; 
    setTheme(themeToSet);
    localStorage.setItem("theme", themeToSet);
  }
  
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme && localTheme != theme) {
      setTheme(localTheme);
      return;
    }
  }, [theme])

  const contentClass =
    theme === themes.dark ? "app__content app__content_dark" : "app__content";
  return (
    <div className="app">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router basename="/react-app">
          <Header />
          <div className={contentClass}>
            <ErrorBoundary>
              <ToDoListPage />
            </ErrorBoundary>
            <Redirect to="/" />
          </div>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
};
