import React from "react";
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import AuthContext from "../../context/auth-context";
import Spinner from "../../components/Spinner";

export const LoginPage = () => {
  const { loading, request } = useHttp();
  const { login, isAuth } = useContext(AuthContext);
  const userData = Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await request("api/tg-auth", "POST", {
          userData,
        });
        login(user);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <Spinner />
  ) : !loading && !isAuth ? (
    <h1>Not logged in</h1>
  ) : (
    <h1>Logged in</h1>
  );
};
