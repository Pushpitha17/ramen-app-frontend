import React from "react";
import { Layout } from "antd";
import { Menu, Row } from "antd";
import { Link } from "react-router-dom";

function Header() {
  const onNavClick = () => {};

  return (
    <Layout.Header className="header-custom">
      <Menu
        mode="horizontal"
        className="nav-menu"
        defaultSelectedKeys={["home"]}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="db"><Link to="/db">Database</Link></Menu.Item>
        <Menu.Item key="info"><Link to="/info">How it Works</Link></Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default Header;
