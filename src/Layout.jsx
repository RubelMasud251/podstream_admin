// Layout.js
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import App from "./App";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for the login status
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Save login status to local storage
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div>
      {isLoggedIn ? (
        <App handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default Layout;
