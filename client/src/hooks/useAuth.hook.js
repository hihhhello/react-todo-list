import { useState, useCallback } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  const login = useCallback((jwtToken, id) => {
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
    localStorage.removeItem;
  }, []);
  return { login, logout, token, userID };
};
