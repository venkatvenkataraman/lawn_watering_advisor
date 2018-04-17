import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar">
    <h5>SprinkYours <i class="fas fa-tint"></i></h5>
  </nav>
);

export default Nav;

{/* <div className="container-fluid">
<div className="navbar-header">
  <button
    type="button"
    className="navbar-toggle"
    data-toggle="collapse"
    data-target=".navbar-ex1-collapse"
  >
    <span className="sr-only">Toggle navigation</span>
    <span className="icon-bar" />
    <span className="icon-bar" />
    <span className="icon-bar" />
  </button>
  <Link className="navbar-brand" to="/">
    Lawn Watering Advisor
  </Link>
</div>
<div className="collapse navbar-collapse navbar-ex1-collapse">
  <ul className="nav navbar-nav navbar-right">
    <li>
      <Link to="/">Nav Link1</Link>
    </li>
    <li>
      <Link to="/saved">Nav Link2</Link>
    </li>
  </ul>
</div>
</div> */}
