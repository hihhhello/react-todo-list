import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import AuthContext from "../../context/auth-context";
import Spinner from "../../components/Spinner";
import "./_login-page.sass";

export const LoginPage = () => {
  const { loading, request, error } = useHttp();
  const { login } = useContext(AuthContext);
  const [intervalID, setIntervalID] = useState(null);
  const redirectTime = 3;
  const [leftTime, setLeftTime] = useState(redirectTime);
  let history = useHistory();
  const userData = Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await request("api/tg-auth", "POST", {
          userData,
        });
        if(user.isNew) {
          await request("https://hihhhello.club/node_test/new-user/", "POST", {
            userData,
          });
        }
        login(user);
      } catch (e) {}
    };
    fetchData();
    return () => clearInterval(intervalID);
  }, [request]);

  if (loading) {
    return <Spinner />;
  }

  if (!intervalID) {
    const redirectDate = new Date().setSeconds(new Date().getSeconds() + redirectTime);
    setTimeout(() => history.push("/"), redirectTime * 1000);
    const timerID = setInterval(() => setLeftTime(Math.round(((redirectDate - new Date()) / 1000))), 1000);
    setIntervalID(timerID);
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-page__wrapper">
          <h1 className="login-page__not-logged">Not logged in</h1>
          {error || <h2 className="login-page__error">{error}</h2>}
          <div className="login-page__timer">
            {`Redirect in ${leftTime} sec...`}
          </div>
        </div>
      </div>
    </div>
  );
};
