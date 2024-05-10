import { useState, useEffect } from "react";
import { db } from "../../Config/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function LatestProducts() {
  const [items, setItems] = useState([]);

  const latestItemsRef = collection(db, "latestItems");

  const getLatestItems = async () => {
    try {
      const data = await getDocs(latestItemsRef);
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
    getLatestItems();
  }, []);

  return (
    <div className="px-[1rem] xl:px-[12rem] py-[1rem]">
      <p className="tracking-wider text-[2.5rem] font-medium">Latest Drop</p>
      <div className=" flex justify-between sm:justify-start flex-wrap mt-[1rem] sm:gap-4">
        {items.map((item) => {
          return (
            <Link
              to=""
              className="flex flex-col overflow-hidden min-w-[10.5rem] max-w-[10.5rem] xl:max-w-[15rem] xl:min-w-[15rem] mb-[1rem]">
              <div className="bg-black bg-opacity-[.1] flex items-center justify-center px-2 min-h-[15rem] max-h-[15rem] xl:max-h-[21rem] xl:min-h-[21rem] w-full">
                <img src={item.mainImageURL} alt="" className="object-cover" />
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
  );
}
