import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Auth from "./components/Admin/AdminAuth/AdminAuth";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
