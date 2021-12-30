import React, { FC } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { ToastContainer } from "react-toastify";

import { Home } from "./views/Home";
import { Dashboard } from "./views/Dashboard";
import { Explore } from "./views/Explore";
import { Creators } from "./views/Creators";
import { Community } from "./views/Community";
import { BlogEditor } from "./views/BlogEditor";
import { NotFound } from "./views/NotFound";

import { WalletModalProvider } from "./context";
import { MetarootModalProvider } from "./context";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

export const App:FC = () => {
    const { isAuthenticated } = useMoralis();
    // All routes should be '/' for custom domain
    return (
        <Router>
            <WalletModalProvider>
                <MetarootModalProvider>
                    <ToastContainer />
                    <Navbar />
                    <div className={isAuthenticated ? "content-container" : ""}>
                        {isAuthenticated && (
                            <div className="sidebar-div">
                                <Sidebar />
                            </div>
                        )}
                        <div
                            className={isAuthenticated ? "main-content-div" : ""}
                        >
                            <Routes>
                                <Route path="*" element={<NotFound />} />
                                {!isAuthenticated && (
                                    <Route path="/second.exchange" element={<Home />} />
                                )}
                                {isAuthenticated && (
                                    <Route
                                        path="/second.exchange"
                                        element={<Dashboard />}
                                    />
                                )}
                                <Route path="/second.exchange/explore" element={<Explore />} />
                                <Route
                                    path="/second.exchange/creators"
                                    element={<Creators />}
                                />
                                <Route
                                    path="/second.exchange/community"
                                    element={<Community />}
                                />
                                {isAuthenticated && (
                                    <Route
                                        path="/second.exchange/editor"
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
