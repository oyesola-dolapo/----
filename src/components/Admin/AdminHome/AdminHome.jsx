import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AdminAuth/AdminAuth";

export default function AdminHome() {
  const { handleSignOut, loggedIn } = useContext(AuthContext);

  return (
    <div className="p-[1rem]">
      <div className="flex items-center justify-between">
        <p className="text-[1.2rem]">Welcome</p>
        <button
          className="bg-black text-white px-[2rem] py-[.6rem]"
          onClick={() => {
            handleSignOut();
          }}>
          Sign Out
        </button>
      </div>
      <div className="flex justify-center mt-[2rem]">
        <a
          href="#"
          className="text-[1.2rem] border-2 border-black border-solid underline px-[2rem] py-[.6rem] tracking-wider font-medium">
          ADD ITEM
        </a>
      </div>
    </div>
  );
}
