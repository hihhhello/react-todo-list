import "./_header.sass";
function Header() {
    return(
        <header className="header">
            <div className="header__wrapper">
                <h2 className="header__logo"><a className="header__link header__link_logo" href="#">TodoList App</a></h2>
                <nav className="header__nav">
                    <a className="header__link header__link_nav" href="#">Link1</a>
                    <a className="header__link header__link_nav" href="#">Link2</a>
                    <a className="header__link header__link_nav" href="#">Link3</a>
                </nav>
            </div>
        </header>
    )
};

export default Header;