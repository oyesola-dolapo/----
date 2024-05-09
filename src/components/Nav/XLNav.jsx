import { useState } from "react";
import { Link } from "react-router-dom";

export default function XLNav() {
  const [search, setSearch] = useState(false);

  const navs = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Shop Latest",
      link: "",
    },
    {
      title: "All Products",
      link: "",
    },
    {
      title: "All Categories",
      link: "",
    },
    {
      title: "FAQS",
      link: "",
    },
  ];

  return (
    <div className="hidden xl:block shadow">
      <nav className="px-[12rem] relative">
        <div className="h-[7rem] flex items-center justify-between ">
          <img
            src="../../images/icons/search.png"
            alt=""
            className="h-[1.3rem] cursor-pointer"
            onClick={() => {
              setSearch(true);
            }}
          />
          <Link to="/">
            <img
              src="../../images/IMG_9840.webp"
              alt=""
              className="h-[3rem] cursor-pointer"
            />
          </Link>
          <Link to="/cart">
            <img
              src="../../images/icons/bag.png"
              alt=""
              className="h-[1.3rem]"
            />
          </Link>
        </div>
        <div className="py-[1rem] flex justify-center gap-4">
          {navs.map((nav) => {
            return (
              <Link
                to={nav.link}
                className="text-[.85rem] tracking-wider font-thin opacity-[.9]">
                {nav.title}
              </Link>
            );
          })}
        </div>
        {search && (
          <div className="h-full w-screen flex justify-center gap-4 absolute left-0 top-0 bg-white items-center">
            <div className="w-[30rem]">
              <div className="h-[3rem] flex justify-between items-center relative pl-6 pr-2 border-[2.7px] border-black border-solid">
                <p className="absolute left-6 top-1 text-[.7rem] font-medium">
                  Search
                </p>
                <input
                  type="text"
                  className="w-[85%] h-[60%] mt-[1rem] outline-none "
                />
                <img
                  src="../../images/icons/search.png"
                  alt=""
                  className="h-[1rem] cursor-pointer"
                  onClick={() => {
                    setSearch(true);
                  }}
                />
              </div>
            </div>
            <img
              src="../../images/icons/close.png"
              alt=""
              className="h-[1.3rem] cursor-pointer"
              onClick={() => {
                setSearch(false);
              }}
            />
          </div>
        )}
      </nav>
    </div>
  );
}
