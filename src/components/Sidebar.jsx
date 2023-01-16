import React, { useState, useEffect, Fragment, useContext } from "react";
import Menu from '../assets/menu.png';
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

import "../styles/navigation.styles.scss";
import { MobileNav } from "../context/MobileNav";

const Sidebar = () => {
  const {data, dispatch} = useContext(MobileNav);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
    if (width <= 769) {
      dispatch({type: "CLOSE"});
    }
    if (width >= 769) {
      dispatch({type: "OPEN"});
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
          <button className="hamburger" onClick={() => dispatch({type: "TOGGLE"})}>
            <img src={Menu} alt="menu button" />
          </button>
          <Navbar />
        </div>
        {data.open && (
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
