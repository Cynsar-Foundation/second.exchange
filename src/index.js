import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

import { App } from "./App";

ReactDOM.render(
    <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_APP_ID}
        serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
    >
        <App />
    </MoralisProvider>,
    document.getElementById("root")
);
