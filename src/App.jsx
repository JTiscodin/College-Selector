import { useState } from "react";
import { Button } from "@mui/material";
import SearchBox from "./components/SearchBox";
import SearchBox2 from "./components/SearchBox2";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchBox />
    </>
  );
}

export default App;
