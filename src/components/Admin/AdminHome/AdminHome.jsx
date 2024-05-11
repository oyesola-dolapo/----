import { useContext } from "react";
import { AuthContext } from "../AdminAuth/AdminAuth";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { handleSignOut, loggedIn } = useContext(AuthContext);

  return (
    <div className="p-[1rem] px-[1rem] xl:px-[12rem] min-h-[80vh]">
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
      {loggedIn && (
        <div className="flex flex-wrap justify-center items-center gap-6 mt-[2rem]">
          <Link
            to="/admin/add"
            className="text-[1.2rem] text-white bg-black px-[2rem] py-[.6rem] tracking-wider font-medium">
            ADD ITEM
          </Link>
          <Link
            to="/admin/add-latest"
            className="text-[1.2rem] text-white bg-black px-[2rem] py-[.6rem] tracking-wider font-medium">
            ADD LATEST ITEM
          </Link>
        </div>
      )}
    </div>
  );
}
