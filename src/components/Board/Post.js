import React, { useState } from "react";

import { AppContext } from "../../Context";
import del from "../images/del.svg";
import pencil from "../images/pencil.svg";
import "./Posts.css";

const PostItem = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const { store, setStore } = React.useContext(AppContext);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div>
      <div className="post-card">
        <div className="post-header">
          <div className="post-title">
            <h1>{props.title}</h1>
          </div>
          <div className="post-icons">
            <span className="post-icon ">
              <div
                onClick={() => {
                  const parent_id = props.dataid;
                  const child_id = props.parentid;

                  const new_data = store.data.map((element) => {
                    if (element.id === parent_id) {
                      element.posts = element.posts.map((post) => {
                        if (post.id === child_id) {
                          if (post.bookmark === 0) {
                            console.log("bookmark");
                            post.bookmark = 1;
                          } else {
                            post.bookmark = 0;
                          }
                        }
                        return post;
                      });
                    }
                    return element;
                  });
                  console.log(new_data);
                  setStore({ ...store, data: new_data });
                }}
              >
                {props.bookmark === 0 ? (
                  <i className="bi bi-bookmark"></i>
                ) : (
                  <i
                    className="bi bi-bookmark-fill"
                    style={{ color: "yellow" }}
                  ></i>
                )}
              </div>
            </span>
            <span className="post-icon">
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
                        setStore({
                          ...store,
                          parentId: props.dataid,
                          childId: props.parentid,
                        });
                        props.setToogle(1);
                      }}
                    >
                      <img
                        src={pencil}
                        alt="pencil"
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                          marginRight: "5px",
                        }}
                      />
                      Edit
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        console.log(props.parentid, props.dataid);
                        const parent_id = props.dataid;
                        const child_id = props.parentid;
                        const new_data = store.data.map((element) => {
                          if (element.id === parent_id) {
                            element.posts = element.posts.filter((post) => {
                              return post.id !== child_id;
                            });
                          }
                          return element;
                        });
                        console.log(new_data);
                        setStore({ ...store, data: new_data });
                      }}

                      style={{ color: "red" }}
                    >
                      <img
                        src={del}
                        alt="del"
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                          marginRight: "5px",
                        }}
                      />
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </span>
          </div>
        </div>
        <div className="post-date">
          <div className="post-date-text">{props.date}</div>
        </div>
        <div className="post-image">
          <img src={props.image} alt="" className="post-rounded-img" />
        </div>
        <div className="post-content">
          <p>{props.content}</p>
        </div>
        <div className="post-divider"></div>
        <div className="post-likes">
          <span className="post-icon">
            <div
              onClick={() => {
                const parent_id = props.dataid;
                const child_id = props.parentid;
                const new_data = store.data.map((element) => {
                  if (element.id === parent_id) {
                    element.posts = element.posts.map((post) => {
                      if (post.id === child_id) {
                        if (post.like === 0) {
                          post.like = 1;
                          post.count = post.count + 1;
                        } else {
                          post.like = 0;
                          post.count = post.count - 1;
                        }
                      }
                      return post;
                    });
                  }
                  return element;
                });
                console.log(new_data);
                setStore({ ...store, data: new_data });
              }}
            >
              {props.like === 0 ? (
                <i className="bi bi-heart"></i>
              ) : (
                <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
              )}
            </div>
          </span>
          <span className="post-likes-count">{props.count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
