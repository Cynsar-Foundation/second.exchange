import React from "react";

import { Home } from "./routes/Home";
import { WalletModalProvider } from "./context";

import './App.scss';

export const App = () => {
    return (
        <WalletModalProvider>
            <div className="App">
                <Home />
            </div>
        </WalletModalProvider>
    );
};
