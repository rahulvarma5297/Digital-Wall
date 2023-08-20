import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context";
import "./Navbar.css";
import img from "../images/logoName.jpeg";
import plus from "../images/plus.svg";
import search from "../images/search.svg";

const Navbar = (props) => {
  const store = React.useContext(AppContext);
  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <Link to="">
            <img src={img} alt="Logo" />
          </Link>
        </div>
        <div>
          <img
            src={search}
            alt="search"
            style={{
              height: "1.5rem",
              width: "1.5rem",
              position: "relative",
              top: "0.3rem",
              left: "5.5rem",
            }}
          />
          <input
            type="search"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => {
              store.setStore({ ...store.store, search: e.target.value });
            }}
          />
        </div>
        <button
          className="create-button"
          onClick={(e) => {
            store.setStore({ ...store.store, pop: true });
          }}
        >
          {" "}
          <img
            src={plus}
            alt="plus"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
          Create new board{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
