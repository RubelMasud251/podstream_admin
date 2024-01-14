import { useState, useEffect } from "react";
import Login from "./pages/Login";
import App from "./App";

const Layout = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("IsToken");
    if (storedLoginStatus) {
      try {
        const parsedToken = JSON.parse(storedLoginStatus);
        setToken(parsedToken);
      } catch (error) {
        // Handle invalid token or any other error
        console.error("Invalid token", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (data) => {
    setToken(data.data);
    localStorage.setItem("IsToken", JSON.stringify(data.data));
    window.location.href = "/";
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("IsToken");
    window.location.href = "/login";
  };

  return (
    <div>
      {token ? (
        <App handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default Layout;
