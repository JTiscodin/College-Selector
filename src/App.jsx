import { useState } from "react";
import { Button } from "@mui/material";
import SearchBox from "./components/SearchBox";
import SearchBox2 from "./components/SearchBox2";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main .lxgw-wenkai-tc-regular">
        <h1>Welcome to College Finder</h1>
        <SearchBox />
      </div>
    </>
  );
}

export default App;
