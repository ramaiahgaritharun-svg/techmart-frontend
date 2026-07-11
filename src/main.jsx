import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./app/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Styles.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-right" />
  </Provider>,
);
