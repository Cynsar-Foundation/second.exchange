import React from "react";
import { useMoralis } from "react-moralis";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "./routes/Home";
import { Explore } from "./routes/Explore";
import { Creators } from "./routes/Creators";
import { NotFound } from "./routes/NotFound";
import { Dashboard } from "./routes/Dashboard";
import { Community } from "./routes/Community";
import { BlogEditor } from "./routes/BlogEditor";

import { WalletModalProvider } from "./context";
import { MetarootModalProvider } from "./context";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { UserCollection } from "./components/UserCollection";

import "./App.scss";
import "../node_modules/antd/dist/antd.css";
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
          <div className={isAuthenticated ? "ContentContainer" : ""}>
            {isAuthenticated && (
              <div className="SidebarDiv">
                <Sidebar />
              </div>
            )}
            <div className={isAuthenticated ? "MainContentDiv" : ""}>
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
                <Route
                  path="/second.exchange/user-collection"
                  element={<UserCollection />}
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
