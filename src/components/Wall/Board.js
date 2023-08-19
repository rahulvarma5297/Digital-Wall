import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Wall.css";

import { AppContext } from "../../Context";

const Board = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const { store, setStore } = React.useContext(AppContext);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="wall-pb">
      <div className="wall-pbf" style={{ backgroundColor: props.color }}></div>
      <div className="wall-pbs">
        <Link to={`${props.link}/${props.id}`}>{props.name}</Link>
      </div>
      <div
        className="centered-dots"
        onMouseEnter={toggleOptions}
        onMouseLeave={toggleOptions}
      >
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        {showOptions && (
          <div className="options">
            <div
              className="option"
              onClick={() => {
                setStore({ ...store, pop: true, parentId: props.id });
              }}
            >
              Edit
            </div>
            <div
              className="option"
              onClick={() => {
                store.data = store.data.filter((element) => {
                  return element.id !== props.id;
                });
                setStore({ ...store, pop: false });
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
