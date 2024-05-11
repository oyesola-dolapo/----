import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../Config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
defineElement(lottie.loadAnimation);

export default function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingItems, setLoadingItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartRef = collection(db, "cart");

  const getCartItems = async () => {
    try {
      const data = await getDocs(cartRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const incrementQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decrementQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const deleteItem = async (id) => {
    const linkDoc = doc(db, "cart", id);
    try {
      setLoadingItems((prevLoadingItems) => [...prevLoadingItems, id]);
      await deleteDoc(linkDoc);
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] p-[1rem] xl:px-[12rem]">
      <p className="tracking-wider text-[1.8rem] xl:text-[2.5rem] font-medium">
        Your Cart
      </p>
      {items.length < 1 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-[3rem]">
          <p className=" text-[1.5rem] sm:text-[1.9rem] xl:text-[3rem] font-medium">
            Your Cart is Empty
          </p>
          <Link
            to="/"
            className="bg-black text-white py-[1rem] px-[2rem] tracking-wider">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            return (
              <div className="flex gap-2 my-[2rem] xl:justify-between">
                <div className="w-[7rem] h-[7rem] xl:w-[11rem] xl:h-[11rem] flex justify-center items-center bg-[#eaeaea]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-[5rem] xl:h-[8rem] object-cover"
                  />
                </div>
                <div>
                  <p className="tracking-widest text-[.8rem] xl:text-[1rem]">
                    {item.name}
                  </p>
                  <p className="tracking-widest  text-[.8rem] xl:text-[1rem]">
                    {item.price} CAD
                  </p>
                  <p>{item.size}</p>
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-black border-solid h-[2.6rem] w-[7rem] flex justify-between items-center px-2 mt-[1rem]">
                      <img
                        src="../../images/icons/remove.png"
                        alt=""
                        className="h-[1.2rem] cursor-pointer"
                        onClick={() => decrementQuantity(item.id)}
                      />
                      <p>{item.quantity}</p>
                      <img
                        src="../../images/icons/add.png"
                        alt=""
                        className="h-[1.2rem] cursor-pointer"
                        onClick={() => incrementQuantity(item.id)}
                      />
                    </div>
                    {loadingItems.includes(item.id) ? (
                      <div className="h-max w-max mt-[1.5rem]">
                        <lord-icon
                          src="https://cdn.lordicon.com/gkryirhd.json"
                          trigger="loop"
                          state="loop-rotation-three-quarters"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}></lord-icon>
                      </div>
                    ) : (
                      <img
                        src="../../images/icons/delete.png"
                        alt=""
                        className="w-[1.2rem] mt-[.8rem] cursor-pointer"
                        onClick={() => deleteItem(item.id)}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <p>Total:</p>
                  <p className="tracking-widest">
                    {item.price * item.quantity} CAD
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
