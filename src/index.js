import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ToastContainer } from "react-toastify";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {" "}
    <Layout />
    <ToastContainer />
  </>
);
