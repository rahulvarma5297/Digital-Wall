import React, { useEffect, useState } from "react";
import { AppContext } from "../../Context";
import Navbar from "../Navbar/Navbar";
import Board from "./Board";
import { v4 as uuidv4 } from "uuid";
import "./Wall.css";

const Home = (props) => {
  const { store, setStore } = React.useContext(AppContext);
  const [boardColor, setBoardColor] = useState("#FFCC66");
  const [boardName, setBoardName] = useState("");
  useEffect(() => {
    setBoardColor(
      store.parentId
        ? store.data.filter((element) => {
            return element.id === store.parentId;
          })[0].color
        : "#FFCC66"
    );
    setBoardName(
      store.parentId
        ? store.data.filter((element) => {
            return element.id === store.parentId;
          })[0].name
        : ""
    );
  }, [store.data, store.parentId]);
  const colors = ["#A7F0F9", "#C5C5FC", "#FFAEC0", "#FFCC66"];
  return (
    <>
      <Navbar />
      <div className="page">
        <br />
        <h1 style={{ margin: "0% 10%" }}>My Boards</h1>
        <br />
        <div className="wall-bx">
          <div className="wall-mb">
            {store.data
              ?.filter((element) => {
                if (store.search?.length > 0) {
                  return element.name
                    ?.toLocaleLowerCase()
                    .includes(store.search?.toLowerCase());
                } else {
                  return true;
                }
              })
              .map((element, id) => {
                return (
                  <Board
                    key={id}
                    id={element.id}
                    object={element}
                    name={element.name}
                    color={element.color}
                    link={"/posts"}
                  />
                );
              })}
          </div>
        </div>

        {/* Board Creation */}
        <div
          className="wall-cr"
          style={{ display: store.pop === true ? "flex" : "none" }}
        >
          <div className="wall-pp">
            <br />
            <div className="wall-w90 pp-hd">
              <div className="wall-f1">Add a name for your board</div>
              <button
                className="wall-bt-cl"
                onClick={(e) => {
                  setStore({ ...store, pop: false, parentId: "" });
                }}
              >
                X
              </button>
            </div>
            <br />
            <input
              type="text"
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
              value={boardName}
              placeholder="Places around the world"
              className="wall-w90 wall-pd-1 wall-input"
            />
            <br />
            <br />
            <div className="wall-w90 wall-f1">Select post colour</div>

            <div className="wall-w90 wall-f2">
              Here are some templates to help you get started
            </div>

            <div className="wall-sl wall-w90 wall-cls">
              <div
                style={{
                  border: boardColor === colors[0] ? "2px solid black" : "none",
                  background: colors[0],
                }}
                onClick={(e) => {
                  setBoardColor(colors[0]);
                }}
                className="wall-cir"
              >
                {" "}
              </div>
              <div
                style={{
                  border: boardColor === colors[1] ? "2px solid black" : "none",
                  background: colors[1],
                }}
                className="wall-cir"
                onClick={(e) => {
                  setBoardColor(colors[1]);
                }}
              >
                {" "}
              </div>
              <div
                style={{
                  border: boardColor === colors[2] ? "2px solid black" : "none",
                  background: colors[2],
                }}
                className="wall-cir"
                onClick={(e) => {
                  setBoardColor(colors[2]);
                }}
              >
                {" "}
              </div>
              <div
                style={{
                  border: boardColor === colors[3] ? "2px solid black" : "none",
                  background: colors[3],
                }}
                className="wall-cir"
                onClick={(e) => {
                  setBoardColor(colors[3]);
                }}
              >
                {" "}
              </div>
            </div>
            <button
              className="wall-bt-sv"
              onClick={() => {
                if (store.parentId) {
                  store.data = store.data.map((element) => {
                    if (element.id === store.parentId) {
                      element.name = boardName;
                      element.color = boardColor;
                    }
                    return element;
                  });
                  setStore({ ...store, pop: false, parentId: "" });
                } else {
                  setStore({
                    ...store,
                    data: [
                      ...store.data,
                      {
                        id: uuidv4(),
                        name: boardName,
                        color: boardColor,
                        posts: [],
                      },
                    ],
                    pop: false,
                  });
                }
                setBoardColor("#FFCC66");
                setBoardName("");
              }}
            >
              {store.parentId ? "Save" : "Create Board"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
