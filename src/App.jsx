import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Auth from "./components/Admin/AdminAuth/AdminAuth";
import XLNav from "./components/Nav/XLNav";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div>
        <Nav />
        <XLNav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
