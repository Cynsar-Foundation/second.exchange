import React, { FC } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./views/Home";
import { Dashboard } from "./views/Dashboard";
import { Explore } from "./views/Explore";
import { Creators } from "./views/Creators";
import { Community } from "./views/Community";
import { BlogEditor } from "./views/BlogEditor";
import { NotFound } from "./views/NotFound";
import { BlogView } from "./views/BlogView";

import { useUserAuthValue, UserAuthProvider } from "./context";
import { WalletModalProvider } from "./context";
import { MetarootModalProvider } from "./context";
import { SessionKeyProvider } from "./context";

import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

export const App: FC = () => {
    const { isUserAuthenticated } = useUserAuthValue();

    // All routes should be '/' for custom domain
    return (
        <Router>
            <SessionKeyProvider>
                <UserAuthProvider>
                    <WalletModalProvider>
                        <MetarootModalProvider>
                            <ToastContainer />
                            <Navbar />
                            <div
                                className={
                                    isUserAuthenticated
                                        ? "content-container"
                                        : ""
                                }
                            >
                                {isUserAuthenticated && (
                                    <div className="sidebar-div">
                                        <Sidebar />
                                    </div>
                                )}
                                <div
                                    className={
                                        isUserAuthenticated
                                            ? "main-content-div"
                                            : ""
                                    }
                                >
                                    <Routes>
                                        <Route
                                            path="*"
                                            element={<NotFound />}
                                        />
                                        {!isUserAuthenticated && (
                                            <Route
                                                path="/second.exchange"
                                                element={<Home />}
                                            />
                                        )}
                                        {isUserAuthenticated && (
                                            <Route
                                                path="/second.exchange"
                                                element={<Dashboard />}
                                            />
                                        )}
                                        <Route
                                            path="/second.exchange/explore"
                                            element={<Explore />}
                                        />
                                        <Route
                                            path="/second.exchange/creators"
                                            element={<Creators />}
                                        />
                                        <Route
                                            path="/second.exchange/community"
                                            element={<Community />}
                                        />
                                        {isUserAuthenticated && (
                                            <Route
                                                path="/second.exchange/write"
                                                element={<BlogEditor />}
                                            />
                                        )}
                                        <Route
                                            path="/second.exchange/read"
                                            element={<BlogView />}
                                        />
                                    </Routes>
                                </div>
                            </div>
                        </MetarootModalProvider>
                    </WalletModalProvider>
                </UserAuthProvider>
            </SessionKeyProvider>
        </Router>
    );
};
