import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

import "../styles/navigation.styles.scss";

const Sidebar = () => {
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  console.log(width);
  console.log(visible);

  const updateWidth = () => {
    setWidth(window.innerWidth);
    if (width <= 425) {
      setVisible(false);
    }
    if (width >= 425) {
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
      <div className={visible ? "sidebar sidebar__visible" : "sidebar sidebar__hidden"}>
        <button className="hamburger" onClick={() => setVisible(!visible)}>
          Menu
        </button>
        <Navbar />
        <Search />
        <Chats />
      </div>
    </Fragment>
  );
};

export default Sidebar;
