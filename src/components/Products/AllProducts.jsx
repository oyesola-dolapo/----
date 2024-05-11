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
        <div className=" flex justify-between sm:justify-start flex-wrap mt-[1rem] sm:gap-4">
          {items.map((item) => {
            return (
              <Link
                to={`/item/${item.id}`}
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
      ) : (
        <div className="flex justify-center w-full mt-[2rem]">
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
