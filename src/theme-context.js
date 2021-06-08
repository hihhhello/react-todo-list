import React from "react";
export const themes = {
    light: "",
    dark: "dark",
};

export const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => {},
});