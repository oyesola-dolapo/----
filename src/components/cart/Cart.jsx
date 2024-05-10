import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  return (
    <div>
      {items.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-6 py-[3rem]">
          <p className=" text-[1.5rem] sm:text-[1.9rem] xl:text-[3rem] font-medium">Your Cart is Empty</p>
          <Link
            to="/"
            className="bg-black text-white py-[1rem] px-[2rem] tracking-wider">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
