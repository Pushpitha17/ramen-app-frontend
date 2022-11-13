import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import "antd/dist/antd.css";
import "./App.css";
import { ContextProvider } from "../AppContext";
import Database from "./Pages/Database";
import Info from "./Pages/Info";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/db" element={<Database />} />
          <Route path="/info" element={<Info />} />

          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
