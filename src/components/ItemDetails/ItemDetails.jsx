import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc, deleteDoc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ItemDetails() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [sizeErr, setSizeErr] = useState(false);
  const [quantityErr, setQuantityErr] = useState(false);
  const [cartShow, setCartShow] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const itemDocRef = doc(db, "latestItems", itemId);
        const itemDocSnap = await getDoc(itemDocRef);
        if (itemDocSnap.exists()) {
          setItem({ id: itemDocSnap.id, ...itemDocSnap.data() });
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
    } catch (err) {
      console.log(err);
    }
  };
  const handleLatestDelete = async (id) => {
    const linkDoc = doc(db, "latestItems", id);
    try {
      await deleteDoc(linkDoc);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCartShow(false);
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

  const cartRef = collection(db, "cart");

  const addCart = async (e) => {
    e.preventDefault();
    try {
      if (size === "") {
        setSizeErr(true);
      }
      if (quantity === 0) {
        setQuantityErr(true);
      } else {
        await addDoc(cartRef, {
          name: item.name,
          price: item.price,
          image: item.mainImageURL,
          quantity: quantity,
          size: size,
        });
        setSizeErr(false);
        setCartShow(true);
        setQuantityErr(false);
      }
    } catch (err) {
      toast.error("Error", 300);
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] py-[1rem] xl:px-[12rem]">
      {item ? (
        <div className="sm:flex items-center sm:flex-row sm:items-start sm:gap-2 px-4">
          <div className=" h-[26rem] sm:h-[30rem] flex gap-2 snap-x overflow-x-scroll sm:hidden">
            <div className="flex-shrink-0 w-full flex justify-center items-center h-full bg-[#eaeaea]">
              <img
                src={item.mainImageURL}
                alt=""
                className="h-[21rem] xl:h-[40rem] object-cover"
              />
            </div>
            {item.subImage1URL && (
              <div className="flex-shrink-0 w-screen h-full flex justify-center items-center bg-[#eaeaea]">
                <img
                  src={item.subImage1URL}
                  alt=""
                  className="h-[21rem] object-cover"
                />
              </div>
            )}
            {item.subImage2URL && (
              <div className="flex-shrink-0 w-screen h-full flex justify-center items-center bg-[#eaeaea]">
                <img
                  src={item.subImage2URL}
                  alt=""
                  className="h-[21rem] object-cover"
                />
              </div>
            )}
          </div>

          <div className="image-container hidden sm:flex sm:flex-col gap-2 h-[30rem] md:h-[60rem] xl:h-[45rem] overflow-y-scroll sm:w-[50%] xl:w-[65%]">
            <div className="flex justify-center items-center h-[30rem] w-full bg-[#eaeaea]">
              <img
                src={item.mainImageURL}
                alt=""
                className="h-[21rem] xl:h-[40rem] object-cover"
              />
            </div>
            {item.subImage1URL && (
              <div className="flex sm:flew-col xl:flex-row gap-2 w-full h-[25rem]">
                {item.subImage1URL && (
                  <div className="bg-[#eaeaea] w-full xl:w-[50%] h-full flex justify-center items-center">
                    <img
                      src={item.subImage1URL}
                      alt=""
                      className="h-[21rem] xl:h-[20rem] object-cover"
                    />
                  </div>
                )}
                {item.subImage2URL && (
                  <div className="bg-[#eaeaea] xl:w-[50%] h-full flex justify-center items-center">
                    <img
                      src={item.subImage2URL}
                      alt=""
                      className="h-[21rem] xl:h-[20rem] object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="product-info px-4 sm:w-[50%] xl:w-[35%] pt-4 sm:pt-0 relative">
            {cartShow && (
              <div className="absolute top-0 left-0 w-full bg-white p-[1rem] shadow z-10">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <i class="fa-solid fa-check"></i>
                    <p>item added to cart</p>
                  </div>
                  <img
                    src="../../images/icons/close.png"
                    alt=""
                    className="h-[1rem] cursor-pointer"
                    onClick={() => {
                      setCartShow(false);
                    }}
                  />
                </div>
                <div className="flex mt-[2rem]">
                  <div className="w-[7rem] h-[6rem] flex justify-center items-center bg-[#eaeaea]">
                    <img
                      src={item.mainImageURL}
                      alt=""
                      className="h-[5rem] object-cover"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-center text-[1.2rem] font-medium tracking-widest">
                      {item.name}
                    </p>
                    <p className="text-center text-gray-400">' {size} '</p>
                  </div>
                </div>
                <Link
                  to="/cart"
                  className="text-[1rem] flex tracking-wider border-2 border-black border-solid w-full h-[3rem] justify-center items-center mt-[2rem]">
                  View Cart
                </Link>
                <Link
                  to=""
                  className="text-[1rem] flex tracking-wider bg-black text-white w-full h-[3rem] justify-center items-center mt-[1rem]">
                  Check Out
                </Link>
                <p
                  onClick={() => {
                    setCartShow(false);
                  }}
                  className="text-center underline tracking-widest mt-[1rem] cursor-pointer">
                  Continue Shopping
                </p>
              </div>
            )}
            <div>
              <p>𝟗ƑℲ</p>
              <h1 className="text-2xl tracking-widest">{item.name}</h1>
              <p className="text-xl pt-4 tracking-wider">{item.price} CAD</p>
              <p className="text-xs opacity-[.7]">Tax included</p>
            </div>
            <div className="mt-4">
              <p className="mb-2">Storlek</p>
              <ul className="flex flex-wrap">
                {sizes.map((size) => {
                  return (
                    <li
                      id="size"
                      className={`${
                        activeSize === size.size ? "active" : ""
                      } border-2 border-black mb-[.4rem] rounded-full min-w-14 h-8 mr-2 flex justify-center flex-wrap items-center`}
                      key={size.size}
                      onClick={() => {
                        setActive(size.size);
                        setSize(size.size);
                      }}>
                      {size.size}
                    </li>
                  );
                })}
              </ul>
              {sizeErr && (
                <div>
                  <p>Select your preferred size</p>
                </div>
              )}
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
              {quantityErr && (
                <div>
                  <p>Select Quantity</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={addCart}
                className="cart-btn w-full h-14 mb-2 border-2 border-black text-lg tracking-wider">
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
                  toast.success("Successfully Deleted", 300);
                }}
                className="border-2 border-red-500 border-solid h-[3rem] w-full text-red-500 tracking-wider uppercase flex justify-center items-center font-medium mt-[1rem]">
                Delete Item
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full mt-[1rem]">
          <lord-icon
            src="https://cdn.lordicon.com/gkryirhd.json"
            trigger="loop"
            state="loop-rotation-three-quarters"
            style={{ width: "40px", height: "40px" }}></lord-icon>
        </div>
      )}
    </div>
  );
}
