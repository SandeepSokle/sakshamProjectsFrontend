import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./redux/home/action";
import axios from "axios";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
  const dispatch = useDispatch();
  const getAllData = async () => {
    let data = await axios.get("http://localhost:8080/products");
    // console.log(data.data.product);
    dispatch(getData(data.data.product));
    return data.data.product;
  };

  useEffect(() => {
    getAllData();
  }, []);
  const userDetail = useSelector((state) => {
    return state.user;
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
