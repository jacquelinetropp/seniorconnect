import React from "react";
import { Link } from "react-router-dom";

import '../styles/navigation.styles.scss';

const MainNavbar = () => {
  return (
    <div className="mainNavbar">
      <div className="logo">
        <Link to="/">Senior Connect</Link>
      </div>
      <div className="mainNavbar__links">
        <Link to="/doctors" className="mainNavbar__links__link">
          Doctors
        </Link>
        <Link to="/residents" className="mainNavbar__links__link">
          Residents
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
