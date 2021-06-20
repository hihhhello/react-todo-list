import { ThemeContext } from "../../context/theme-context";

import { NavLink } from "react-router-dom";

import "./_header.sass";

function Header() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <header className={theme === "dark" ? "header dark" : "header"}>
          <div className="header__wrapper">
            <h2 className="header__logo">
              <NavLink className="header__link header__link_logo" to="./">
                TodoList App
              </NavLink>
            </h2>
            <button className="header__togle-btn" onClick={toggleTheme}>
              Toggle theme
            </button>
          </div>
        </header>
      )}
    </ThemeContext.Consumer>
  );
}

export default Header;
