import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import leftarrow from "../images/LeftArrow.svg";
import img from "../images/smlogo.jpeg";
import { AppContext } from "../../Context";
import Post from "../Board/Post";
import srch from "../images/search.svg";

const Bookmark = () => {
  const { store, setStore } = React.useContext(AppContext);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // fetch all the posts which has bookmark 1
    const bookmarkedPosts = [];
    store.data.map((element) => {
      element.posts.filter((post) => {
        if (post.bookmark === 1) {
          bookmarkedPosts.push(post);
        }
      });
    });
    console.log(bookmarkedPosts);
    setData(bookmarkedPosts);
  }, [store.data]);

  return (
    <div>
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
          <span className="logo-text">My bookmarks</span>
        </Link>

        <span className="post-icon ">
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
          <Link to={"/bookmarks"}>
            <i className="bi bi-bookmark-fill"></i>
          </Link>
        </span>
      </div>

      <div
        className="ps-cn"
        style={{
          display: data.length === 0 ? "none" : "flex",
          backgroundColor: "rgba(167, 240, 249, 0.5)",
          height: "90vh",
        }}
      >
        {data &&
          data
            ?.filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((element) => {
              return (
                <Post
                  key={element.id}
                  title={element.title}
                  image={element.image}
                  content={element.content}
                  like={element.like}
                  date={element.date}
                  parentid={element.id}
                  count={element.count}
                  bookmark={element.bookmark}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Bookmark;
