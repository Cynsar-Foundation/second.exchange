import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

import { App } from "./App";

ReactDOM.render(
    <MoralisProvider
        appId="Hq0CvClFFiHVNkjTS7x4bISqbRSVLqOyYIG7J3NA"
        serverUrl="https://hvxpiojoa7ai.usemoralis.com:2053/server"
    >
        <App />
    </MoralisProvider>,
    document.getElementById("root")
);
