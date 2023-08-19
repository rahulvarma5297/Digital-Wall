import React from "react";

export const AppContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [store, setStore] = React.useState({
    data: [
      {
        id: "1",
        name: "John",
        color: "#FFCC66",
        posts: [
          {
            id: "1",
            title: "This is a post",
            image: "https://picsum.photos/200/200",
            content: "This is the content of the post",
            count: 0,
            like: 0,
            date: "21st Jan",
            bookmark: 1,
          },
          {
            id: "2",
            title: "This is a post2",
            image: "https://picsum.photos/200/200",
            content: "This is the content of the post",
            count: 10,
            like: 0,
            date: "21st Jan",
            bookmark: 0,
          },
        ],
      },
      {
        id: "2",
        name: "Doe",
        color: "#FFAEC0",
        posts: [
        ],
      },
    ],
    pop: false,
    search: "",
    parentId: "",
    childId: "",
  });
  return (
    <AppContext.Provider value={{ store, setStore }}>
      {children}
    </AppContext.Provider>
  );
};
