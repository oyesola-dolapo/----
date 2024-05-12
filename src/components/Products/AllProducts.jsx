import { useState, useEffect } from "react";
import { db } from "../../Config/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [items, setItems] = useState([]);

  const allItemsRef = collection(db, "items");

  const getAllItems = async () => {
    try {
      const data = await getDocs(allItemsRef);
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
    getAllItems();
  }, []);
  return (
    <div className="px-[1rem] xl:px-[12rem] py-[1rem] min-h-[80vh]">
      <p className="tracking-wider text-[1.8rem] xl:text-[2.5rem] font-medium">
        All Products
      </p>
      {items.length > 0 ? (
        <div className=" flex justify-between xl:justify-start flex-wrap mt-[1rem] md:px-[2rem] xl:gap-4">
          {items.map((item) => {
            return (
              <Link
                to={`/item/${item.id}`}
                className="flex flex-col overflow-hidden w-[49%] xl:w-[17rem] mb-[1rem]">
                <div className="bg-black bg-opacity-[.1] flex items-center justify-center px-2 h-[15rem] md:h-[30rem] xl:h-[21rem] w-full">
                  <img
                    src={item.mainImageURL}
                    alt=""
                    className="w-[14rem] md:w-[25rem] object-cover"
                  />
                </div>
                <p className="tracking-wider my-[.6rem] text-[.8rem]  md:text-[1rem]">
                  {item.name}
                </p>
                <p className="tracking-wider text-[1rem]">{item.price} CAD</p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[60vh]">
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
