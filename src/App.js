import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/list" element={<List />}></Route>
      </Routes>
    </>
  );
}

export default App;
