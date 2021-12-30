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
                                        exact
                                    />
                                )}
                                <Route path="/second.exchange/Explore" element={<Explore />} />
                                <Route
                                    path="/second.exchange/Creators"
                                    element={<Creators />}
                                />
                                <Route
                                    path="/second.exchange/Community"
                                    element={<Community />}
                                />
                                {isAuthenticated && (
                                    <Route
                                        path="/second.exchange/WriteBlog"
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
