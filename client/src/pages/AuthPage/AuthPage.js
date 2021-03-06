import React from "react";
import { useScript } from "../../hooks/script.hook";
import "./_auth-page.sass";

export const AuthPage = () => {
  useScript({
    url: "https://telegram.org/js/telegram-widget.js?15",
    isAsync: true,
    data: [
      { attr: "telegramLogin", value: "node321bot" },
      { attr: "size", value: "large" },
      { attr: "authUrl", value: "/react-todo-list/login" },
      { attr: "requestAccess", value: "write" },
    ],
    parentSelector: ".auth-page__wrapper",
  });

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-page__wrapper">
          <h1 className="auth-page__title">
            Synchronize your table from{" "}
            <a href="https://t.me/node321bot" target="_blank" rel="noreferrer">
              telegram bot
            </a>
          </h1>
          <span className="auth-page__arrow">&#8595;</span>
        </div>
      </div>
    </div>
  );
};
