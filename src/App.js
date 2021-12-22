import React from "react";

import { Home } from "./routes/Home";
import { ToastContainer } from "react-toastify";
import { WalletModalProvider } from "./context";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <WalletModalProvider>
      <ToastContainer />
      <div className="App">
        <Home />
      </div>
    </WalletModalProvider>
  );
};
