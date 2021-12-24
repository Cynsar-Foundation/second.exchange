import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { ToastContainer } from "react-toastify";

import { Home } from "./routes/Home";
import { Dashboard } from "./routes/Dashboard";
import { Explore } from "./routes/Explore";
import { Creators } from "./routes/Creators";
import { Community } from "./routes/Community";
import { BlogEditor } from "./routes/BlogEditor";
import { NotFound } from "./routes/NotFound";

import { WalletModalProvider } from "./context";
import { MetarootModalProvider } from "./context";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
    const { isAuthenticated } = useMoralis();

    return (
        <Router>
            <WalletModalProvider>
                <MetarootModalProvider>
                    <ToastContainer />
                    <Navbar />
                    <div className={isAuthenticated ? "ContentContainer" : ""}>
                        {isAuthenticated && (
                            <div className="SidebarDiv">
                                <Sidebar />
                            </div>
                        )}
                        <div
                            className={isAuthenticated ? "MainContentDiv" : ""}
                        >
                            <Routes>
                                <Route path="*" element={<NotFound />} />
                                {!isAuthenticated && (
                                    <Route path="/" element={<Home />} exact />
                                )}
                                {isAuthenticated && (
                                    <Route
                                        path="/"
                                        element={<Dashboard />}
                                        exact
                                    />
                                )}
                                <Route path="/Explore" element={<Explore />} />
                                <Route
                                    path="/Creators"
                                    element={<Creators />}
                                />
                                <Route
                                    path="/Community"
                                    element={<Community />}
                                />
                                {isAuthenticated && (
                                    <Route
                                        path="/WriteBlog"
                                        element={<BlogEditor />}
                                    />
                                )}
                            </Routes>
                        </div>
                    </div>
                </MetarootModalProvider>
            </WalletModalProvider>
        </Router>
    );
};
