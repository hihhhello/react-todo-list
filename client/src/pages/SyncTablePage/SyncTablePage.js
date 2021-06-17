import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hooks";

export const SyncTablePage = () => {
  const { loading, request } = useHttp();
  const [userID, setUserID] = useState("");

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
          <div className="sync-table-page__form">
            <input
              id="user-id"
              name="user-id"
              className="sync-table-page__input"
              type="number"
              placeholder="Input your UserID"
              onChange={changeHandler}
            />
            <label htmlFor="user-id">USER ID</label>
            <button
              className="sync-table-page__btn"
              onClick={syncTablesHandler}
              type="button"
              disabled={loading}
            >
              Synchronize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
