import React, { useState, useEffect, Fragment } from "react";
import Menu from '../assets/menu.png';
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

import "../styles/navigation.styles.scss";

const Sidebar = () => {
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
    if (width <= 769) {
      setVisible(false);
    }
    if (width >= 769) {
      setVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.addEventListener("resize", updateWidth);
    };
  });

  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar__header">
          <button className="hamburger" onClick={() => setVisible(!visible)}>
            <img src={Menu} alt="menu button" />
          </button>
          <Navbar />
        </div>
        {visible && (
          <>
            <Search />
            <Chats />
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
