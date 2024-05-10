import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AdminAuth/AdminAuth";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { handleSignOut, loggedIn } = useContext(AuthContext);

  return (
    <div className="p-[1rem] px-[12rem]">
      <div className="flex items-center justify-between">
        <p className="text-[1.2rem]">Welcome</p>
        <button
          className="underline"
          onClick={() => {
            handleSignOut();
          }}>
          Sign Out
        </button>
      </div>
      <div className="flex justify-center mt-[2rem]">
        <Link
          to="/admin/add"
          className="text-[1.2rem] text-white bg-black px-[2rem] py-[.6rem] tracking-wider font-medium">
          ADD ITEM
        </Link>
      </div>
    </div>
  );
}
