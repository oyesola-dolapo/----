import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../Config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [items, setItems] = useState([]);

  const dataCollectionRef = collection(db, "items");

  const getItems = async () => {
    try {
      const data = await getDocs(dataCollectionRef);
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
    getItems();
  }, []);
  return (
    <div>
      <div className="h-[12rem] md:h-[25rem] xl:h-[90vh] bg-black bg-opacity-[.1] relative">
        <a
          href="#"
          className="tracking-widest bg-white shadow-lg px-[2rem] py-[1rem] text-[1rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          SHOP LATEST
        </a>
      </div>
      <div className="py-[1rem] px-[1rem]">
        <p className="tracking-wider text-[1.7rem] text-center mb-[1rem]">
          COLLECTION
        </p>
        <div className=" flex justify-between sm:justify-center flex-wrap sm:gap-4">
          {items.map((item) => {
            return (
              <Link
                to=""
                className="flex flex-col overflow-hidden min-w-[10.5rem] max-w-[10.5rem] xl:max-w-[15rem] xl:min-w-[15rem] mb-[1rem]">
                <div className="bg-black bg-opacity-[.1] flex items-center justify-center px-2 min-h-[15rem] max-h-[15rem] xl:max-h-[21rem] xl:min-h-[21rem] w-full">
                  <img
                    src={item.mainImageURL}
                    alt=""
                    className="object-cover"
                  />
                </div>
                <p className="tracking-wider my-[.6rem] text-[.8rem]">
                  {item.name}
                </p>
                <p className="tracking-wider text-[1rem]">{item.price} CAD</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
