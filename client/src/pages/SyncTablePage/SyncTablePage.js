import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hooks";
import { useScript } from "../../hooks/script.hooks";
import "./_sync-table-page.sass";

export const SyncTablePage = () => {
  const { loading, request } = useHttp();
  const [userID, setUserID] = useState("");
  useScript({ 
              url:"https://telegram.org/js/telegram-widget.js?15",
              isAsync:true,
              data:[
                {attr: "telegramLogin", value: "node321bot"},
                {attr: "size", value:"large"},
                {attr: "authUrl", value:"/react-app/api/tg-auth"},
                {attr: "requestAccess", value:"write"},
              ],
              parentSelector: ".sync-table-page__wrapper",
            })
  const changeHandler = (e) => {
    e.preventDefault();
    setUserID(e.target.value);
  };

  const syncTablesHandler = async () => {
    try {
      const userData = await request("api/sync", "POST", { userID });
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {}
  };

  return (
    <div className="sync-table-page">
      <div className="container">
        <div className="sync-table-page__wrapper">
          <h1 className="sync-table-page__title">
            Synchronize your table from{" "}
            <a href="https://t.me/node321bot" target="_blank" rel="noreferrer">
              telegram bot
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};
