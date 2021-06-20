import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const login = useCallback(({ token: jwtToken, userID: id }) => {
    setToken(jwtToken);
    setUserID(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userID,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(storageName));

    if (userData && userData.token) {
      login(userData);
    }
  }, [login]);

  return { login, logout, token, userID };
};
