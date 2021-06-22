import React from "react";
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import AuthContext from "../../context/auth-context";
import Spinner from "../../components/Spinner";
import "./_login-page.sass";

export const LoginPage = () => {
  const { loading, request, error } = useHttp();
  const { login } = useContext(AuthContext);
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
        
      }
    };
    fetchData();
  }, []);

  let pageContent = null;
  if(loading) {
    pageContent = <Spinner />
  } else {
    pageContent = (
      <>
          <h1 className="login-page__not-logged">Not logged in</h1>
          {error || <h2 className="login-page__error">{error}</h2>}
      </>
    )
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-page__wrapper">
          {pageContent}
        </div>
      </div>
    </div>
  );
};
