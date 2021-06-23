import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import AuthContext from "../../context/auth-context";

import { NavLink } from "react-router-dom";

import "./_header.sass";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout, isAuth } = useContext(AuthContext);
  return (
    <header className={theme === "dark" ? "header dark" : "header"}>
      <div className="header__wrapper">
        <h2 className="header__logo">
          <NavLink className="header__link header__link_logo" to="./">
            TodoList App
          </NavLink>
        </h2>
        <div className="header__btns">
          {isAuth && (
            <button className="header__btn" onClick={logout}>
              Logout
            </button>
          )}
          <button className="header__btn" onClick={toggleTheme}>
            Toggle theme
          </button>
        </div>
      </div>
    </header>
  );
};
