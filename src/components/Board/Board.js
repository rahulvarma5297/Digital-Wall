import React, { useState, useEffect } from "react";
import "./Posts.css";
import { Link } from "react-router-dom";
import img from "../images/smlogo.jpeg";
import img2 from "../images/pic1.svg";
import leftarrow from "../images/LeftArrow.svg";
import PostItem from "./Post";
import plus from "../images/plus.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppContext } from "../../Context";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import srch from "../images/search.svg";

import axios from "axios";

const Posts = (props) => {
  const { id } = useParams();
  const { store, setStore } = React.useContext(AppContext);

  const [title, setTitle] = useState("");
  const [mypost, setMypost] = useState([]);
  const [toogle, setToogle] = useState(0);
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [image, setImage] = useState("");
  const [bgcolor, setBgcolor] = useState("#A7F0F9");

  useEffect(() => {
    store.data.map((element) => {
      if (element.id === id) {
        setTitle(element.name);
        setBgcolor(element.color);
      }
    });
  }, [id, store.data]);

  useEffect(() => {
    const parent_id = store.parentId;
    const child_id = store.childId;
    const parent_data = store.data.filter((element) => {
      return element.id === parent_id;
    });

    console.log(parent_data[0]);
    const child_data = child_id
      ? parent_data[0].posts.filter((element) => {
          return element.id === child_id;
        })
      : [];
    console.log(child_data);
    setPostTitle(child_id ? child_data[0].title : "");
    setPostDesc(child_id ? child_data[0].content : "");
    setImage(child_id ? child_data[0].image : "");
  }, [store]);

  const [search, setSearch] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    const post = store.data.filter((element) => {
      return element.id === id;
    });
    setMypost(post[0].posts);
  }, [id, store.data]);
  return (
    <div>
      <div style={{}}>
        <div
          className="navbar"
          style={{
            height: "10vh",
          }}
        >
          <div className="back-button">
            <i className="fas fa-arrow-left"></i>
          </div>
          <Link to="/" className="logo hf-cn">
            <img src={leftarrow} alt="Logo" className="img1" />

            <img src={img} alt="Logo" className="img2" />
            <span className="logo-text">{title}</span>
          </Link>
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="Search posts.."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <img src={srch} alt="search" />
          </div>
          <span class="vertical-line"> </span>
          <span className="post-icon ">
            <Link to={"/bookmarks"}>
              <i className="bi bi-bookmark"></i>
            </Link>
          </span>
        </div>

        <div
          className="content"
          style={{
            display: mypost.length === 0 ? "block" : "none",
            backgroundColor: `${bgcolor}`,
          }}
        >
          <h2 className="heading">Your posts</h2>
          <div className="add-something-icon">
            <img src={img2} alt="img" />
            <div className="no-posts-text">
              <p className="p1">Nothing here yet.</p>
              <p>Create your first post by clicking the + button above.</p>
            </div>
          </div>
        </div>

        <div
          className="ps-cn"
          style={{
            display: mypost.length === 0 ? "none" : "flex",
            backgroundColor: `${bgcolor}`,
          }}
        >
          {mypost
            ?.filter((element) => {
              if (search?.length > 0) {
                return element.title
                  ?.toLocaleLowerCase()
                  .includes(search?.toLocaleLowerCase());
              } else {
                return true;
              }
            })
            .map((element) => {
              return (
                <PostItem
                  key={element.id}
                  title={element.title}
                  image={element.image}
                  content={element.content}
                  like={element.like}
                  date={element.date}
                  dataid={id}
                  parentid={element.id}
                  setToogle={setToogle}
                  count={element.count}
                  bookmark={element.bookmark}
                />
              );
            })}
        </div>
        <button
          className="cr-btn"
          onClick={(e) => {
            setToogle(1);
          }}
        >
          {" "}
          <img
            src={plus}
            alt="plus"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
          Create new post{" "}
        </button>

        <div
          className="wall-cr"
          style={{ display: toogle === 1 ? "flex" : "none" }}
        >
          <div
            className="wall-pp"
            style={{
              height: `${store.childId ? "42rem" : "35rem"}`,
              width: "35rem",
            }}
          >
            <br />
            <div className="wall-w90 pp-hd">
              <div className="wall-f1">Create a post</div>
              <button
                onClick={(e) => {
                  setToogle(0);
                  setStore({
                    ...store,
                    pop: false,
                    childId: "",
                    parentId: "",
                  });
                }}
                className="wall-bt-cl"
              >
                X
              </button>
            </div>
            <div className="wall-w90 post-text">
              Write something for your post
            </div>
            <br />
            <div className="wall-w90 post-sub">Subject</div>
            <input
              type="text"
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
              value={postTitle}
              placeholder="Enter title for your post"
              className="wall-w90 wall-pd-1 wall-input"
            />
            <div className="wall-w90 ">
              <br />
              {store.childId === "" && (
                <label htmlFor="fileInput" className="photo-upload-btn">
                  <i className="bi bi-image"></i>
                  Add your image
                </label>
              )}
              {store.childId && (
                <img src={image} alt="" width="100px" height="100px" />
              )}

              <input
                type="file"
                id="fileInput"
                onChange={onImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="wall-w90 ">
              {/* <img src={image} alt="" className="post-rounded-img" /> */}
            </div>
            <hr
              style={{
                width: "90%",
                height: "10px",
                color: "black",
                border: "none",
              }}
            />
            <div className="wall-w90">
              <br />
              <br />
            </div>
            <div className="wall-w90 post-head">What's on your mind?</div>
            <input
              type="text "
              className="wall-w90 wall-pd-1 wall-input"
              placeholder="Type here"
              onChange={(e) => {
                setPostDesc(e.target.value);
              }}
              value={postDesc}
            />

            <button
              className="wall-bt-sv"
              onClick={async () => {
                if (!store.childId) {
                  const post = store.data.filter((element) => {
                    return element.id === id;
                  });
                  const formData = new FormData();
                  formData.append("file", image);
                  formData.append("upload_preset", "vyppr29e");
                  const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dkxyvztrd/image/upload",
                    formData
                  );
                  const url = response.data.secure_url;

                  // date I need like 21 Jan
                  const date = new Date();
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  const day = date.getDate();
                  const postDate = day + " " + month;

                  post[0].posts.push({
                    id: uuidv4(),
                    title: postTitle,
                    image: url,
                    content: postDesc,
                    like: 0,
                    date: postDate,
                    count: 0,
                    bookmark: 0,
                  });
                  setStore({ ...store, pop: false });
                  setToogle(0);
                } else {
                  const formData = new FormData();
                  formData.append("file", image);
                  formData.append("upload_preset", "vyppr29e");
                  const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dkxyvztrd/image/upload",
                    formData
                  );
                  const url = response.data.secure_url;
                  // if childId is present then update the post
                  store.childId ? setImage(url) : setImage(image);

                  const parent_id = store.parentId;
                  const child_id = store.childId;
                  const new_data = store.data.map((element) => {
                    if (element.id === parent_id) {
                      element.posts = element.posts.map((post) => {
                        if (post.id === child_id) {
                          post.title = postTitle;
                          post.content = postDesc;
                          post.image = image;
                        }
                        return post;
                      });
                    }
                    return element;
                  });
                  setStore({
                    ...store,
                    data: new_data,
                    pop: false,
                    childId: "",
                    parentId: "",
                  });
                }

                setToogle(0);
              }}
            >
              {store.childId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
