import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Wall/Wall";
import Posts from "./components/Board/Board";
import Bookmark from "./components/Bookmark/Bookmark";

// export const AppContext = React.createContext();
import { ContextProvider } from "./Context";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Posts />} />
            <Route path="/bookmarks" element={<Bookmark />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
