import { ThemeContext } from "./theme-context";

import "./_header.sass";

function Header() {
    return(
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => (
                <header className={theme === "dark" ? "header dark" : "header"}>
                    <div className="header__wrapper">
                        <h2 className="header__logo"><a className="header__link header__link_logo" href="#">TodoList App</a></h2>
                        <nav className="header__nav">
                            <button 
                                className="header__togle-btn"
                                onClick={toggleTheme}
                            >
                                Toggle theme
                            </button>
                            <a className="header__link header__link_nav" href="#">Link1</a>
                            <a className="header__link header__link_nav" href="#">Link2</a>
                            <a className="header__link header__link_nav" href="#">Link3</a>
                        </nav>
                    </div>
                </header>
            )}
        </ThemeContext.Consumer>
    )
};

export default Header;