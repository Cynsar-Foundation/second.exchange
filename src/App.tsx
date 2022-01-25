/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row } from "antd";
import { Home } from "./views/Home";
import { Explore } from "./views/Explore";
import { Creators } from "./views/Creators";
import { BlogView } from "./views/BlogView";
import { NotFound } from "./views/NotFound";
import { Dashboard } from "./views/Dashboard";
import { Community } from "./views/Community";
import { BlogEditor } from "./views/BlogEditor";
import { ToastContainer } from "react-toastify";
import React, { FC /*, useEffect*/ } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { KeyModalProvider } from "./context";
import { AuthModalProvider } from "./context";
import { SessionKeyProvider } from "./context";
import { MetarootModalProvider } from "./context";
import { useUserAuthContext, UserAuthProvider } from "./context";

import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { UserCollection } from "./components/UserCollection";

import "./App.scss";
import "../node_modules/antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

export const App: FC = () => {
  const { isUserAuthenticated } = useUserAuthContext();

  // All routes should be '/' for custom domain
  return (
    <Router>
      <SessionKeyProvider>
        <UserAuthProvider>
          <AuthModalProvider>
            <KeyModalProvider>
              <MetarootModalProvider>
                <ToastContainer />
                <Row className="home-main">
                  <Col span={19} className="home-content-div">
                    <Navbar />
                    <div
                      className={isUserAuthenticated ? "content-container" : ""}
                    >
                      <div
                        className={
                          isUserAuthenticated ? "main-content-div" : ""
                        }
                      >
                        <Routes>
                          <Route path="*" element={<NotFound />} />
                          {!isUserAuthenticated && (
                            <Route path="/second.exchange" element={<Home />} />
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
                            path="/second.exchange/user-collection"
                            element={<UserCollection />}
                          />
                          <Route
                            path="/second.exchange/read"
                            element={<BlogView />}
                          />
                        </Routes>
                      </div>
                    </div>
                  </Col>
                  <Col span={5} className="sidebar-div-main">
                    {isUserAuthenticated && (
                      <div className="sidebar-div">
                        <Sidebar />
                      </div>
                    )}
                  </Col>
                </Row>
              </MetarootModalProvider>
            </KeyModalProvider>
          </AuthModalProvider>
        </UserAuthProvider>
      </SessionKeyProvider>
    </Router>
  );
};
