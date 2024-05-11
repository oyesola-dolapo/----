import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

export default function ItemDetails() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const itemDocRef = doc(db, "latestItems", itemId);
        const itemDocSnap = await getDoc(itemDocRef);
        if (itemDocSnap.exists()) {
          setItem({ id: itemDocSnap.id, ...itemDocSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    const fetchAll = async () => {
      try {
        const itemDocRef = doc(db, "items", itemId);
        const itemDocSnap = await getDoc(itemDocRef);
        if (itemDocSnap.exists()) {
          setItem({ id: itemDocSnap.id, ...itemDocSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    fetchLatest();
    fetchAll();
  }, [itemId]);

  const handleAllDelete = async (id) => {
    const linkDoc = doc(db, "items", id);
    try {
      await deleteDoc(linkDoc);
      toast.success("Successfully Deleted", autoClose);
      getLink();
    } catch (err) {
      console.log(err);
      toast.error("Error", autoClose);
    }
  };
  const handleLatestDelete = async (id) => {
    const linkDoc = doc(db, "latestItems", id);
    try {
      await deleteDoc(linkDoc);
      toast.success("Successfully Deleted", autoClose);
      getLink();
    } catch (err) {
      console.log(err);
      toast.error("Error", autoClose);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sizes = [
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
  ];

  const [activeSize, setActiveSize] = useState(null);

  const setActive = (size) => {
    setActiveSize(size);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-[80vh] py-[1rem]">
      {item ? (
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-2 px-4">
          <div className="image-container bg-[#eaeaea] w-[90%] h-[23rem] flex justify-center items-center lg:h-[30rem]">
            <img
              src={item.mainImageURL}
              alt=""
              className="h-[21rem] xl:h-[32rem] object-cover"
            />
          </div>
          <div className="product-info px-4 w-full pt-4 sm:pt-0">
            <div>
              <p>𝟗ƑℲ</p>
              <h1 className="text-2xl tracking-widest">{item.name}</h1>
              <p className="text-xl pt-4 tracking-wider">{item.price}</p>
              <p className="text-xs opacity-[.7]">Tax included</p>
            </div>
            <div className="mt-4">
              <p className="mb-2">Storlek</p>
              <ul className="flex">
                {sizes.map((size) => {
                  return (
                    <li
                      id="size"
                      className={`${
                        activeSize === size.size ? "active" : ""
                      } border-2 border-black rounded-full w-14 h-8 mr-2 flex justify-center items-center`}
                      key={size.size}
                      onClick={() => setActive(size.size)}>
                      {size.size}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="my-[1rem]">
              <p className="text-[.8rem] tracking-wider mb-[.5rem]">Quantity</p>
              <div className="border-2 border-black border-solid h-[2.6rem] w-[7rem] flex justify-between items-center px-2">
                <img
                  src="../../images/icons/remove.png"
                  alt=""
                  className="h-[1.2rem] cursor-pointer"
                  onClick={decrementQuantity}
                />
                <p>{quantity}</p>
                <img
                  src="../../images/icons/add.png"
                  alt=""
                  className="h-[1.2rem] cursor-pointer"
                  onClick={incrementQuantity}
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="cart-btn w-full h-14 mb-2 border-2 border-black text-lg tracking-wider">
                Add to cart
              </button>
              <a href="#" className=" text-center underline text-sm">
                <p>Payment Options</p>
              </a>
              <p className="opacity-[.7] mt-4">{item.desc}</p>
            </div>
            {currentUser && (
              <div
                onClick={() => {
                  handleAllDelete(item.id);
                  handleLatestDelete(item.id);
                }}
                className="border-2 border-red-500 border-solid h-[3rem] w-full text-red-500 tracking-wider uppercase flex justify-center items-center font-medium mt-[1rem]">
                Delete Item
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl font-medium opacity-[.6] py-12">
          Loading...
        </div>
      )}
    </div>
  );
}
