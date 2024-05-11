import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/AuthContext";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Auth from "./components/Admin/AdminAuth/AdminAuth";
import XLNav from "./components/Nav/XLNav";
import Cart from "./components/cart/Cart";
import AddItem from "./components/Admin/AdminHome/AddItem/AddItem";
import AddLatest from "./components/Admin/AdminHome/AddItem/AddLatest";
import AllProducts from "./components/Products/AllProducts";
import LatestProducts from "./components/Products/LatestProducts";
import Footer from "./components/Footer/Footer";
import ItemDetails from "./components/ItemDetails/ItemDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <div>
          <Nav />
          <XLNav />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/add" element={<AddItem />} />
          <Route path="/admin/add-latest" element={<AddLatest />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/latest-products" element={<LatestProducts />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
