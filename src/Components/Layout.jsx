import { Layout, Row } from "antd";

import { Routes, Route, Outlet, Link } from "react-router-dom";

import React from "react";
import Header from "./Header";
const { Footer, Sider, Content } = Layout;

function MainLayout({ children }) {
  return (
    <>
      <Layout>
        <Header />
        <div className="main-wrapper">
          <div className="container">
            <Outlet />
          </div>
        </div>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </>
  );
}

export default MainLayout;
