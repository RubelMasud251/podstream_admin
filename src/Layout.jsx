// Layout.js
import { useState } from "react";
import Login from "./pages/Login";
import App from "./App";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
