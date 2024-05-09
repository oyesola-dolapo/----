import React, { useState, useEffect } from "react";

export default function Nav() {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  const navs = [
    {
      title: "Home",
      link: "",
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

  const socials = [
    {
      icon: <i class="fa-brands fa-instagram"></i>,
      link: "https://www.instagram.com/9ff.clothing?igsh=aTJrY2pnOTBldDdr",
    },
    {
      icon: <i class="fa-brands fa-tiktok"></i>,
      link: "https://www.instagram.com/9ff.clothing?igsh=aTJrY2pnOTBldDdr",
    },
  ];

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  return (
    <div className="relative">
      <nav className="w-full h-[6rem] shadow-lg flex justify-between items-center px-[1rem] relative">
        <div>
          {!menu ? (
            <img
              src="../../images/icons/menu.png"
              alt=""
              className="h-[1.5rem]"
              onClick={() => {
                setMenu(true);
              }}
            />
          ) : (
            <img
              src="../../images/icons/close.png"
              alt=""
              className="h-[1.3rem]"
              onClick={() => {
                setMenu(false);
              }}
            />
          )}
        </div>
        <img
          src="../../images/IMG_9840.webp"
          alt=""
          className="h-[3rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
        <div className="flex gap-8 items-center">
          <img
            src="../../images/icons/search.png"
            alt=""
            className="h-[1.3rem]"
            onClick={() => {
              setSearch(true);
            }}
          />
          <img src="../../images/icons/bag.png" alt="" className="h-[1.3rem]" />
        </div>
      </nav>
      {search && (
        <div className="h-[6rem] w-full shadow flex justify-around absolute left-0 top-0 bg-white items-center">
          <div className="w-[85%]">
            <div className="h-[3rem] flex justify-between items-center relative pl-6 pr-2 border-[.2px] border-black border-solid">
              <p className="absolute left-6 top-1 text-[.7rem]">Search</p>
              <input
                type="text"
                className="w-[85%] h-[60%] mt-[1rem] outline-none "
              />
              <img
                src="../../images/icons/search.png"
                alt=""
                className="h-[1.3rem]"
                onClick={() => {
                  setMenu(false);
                  setSearch(true);
                }}
              />
            </div>
          </div>
          <img
            src="../../images/icons/close.png"
            alt=""
            className="h-[1.3rem]"
            onClick={() => {
              setSearch(false);
            }}
          />
        </div>
      )}
      {menu && (
        <div className="fixed top-0 left-0 bottom-0 w-full z-50 mt-[6rem] bg-black bg-opacity-[.5] h-[77vh]">
          <div className="pt-[3rem] flex flex-col justify-between w-[80%] h-full bg-white">
            <div>
              {navs.map((nav) => {
                return (
                  <a
                    href=""
                    className="flex py-[.6rem] px-[2rem] font-medium text-lg tracking-wide">
                    {nav.title}
                  </a>
                );
              })}
            </div>
            <div className="px-[2rem] py-[1rem] h-[6rem] flex gap-4 bg-[#eaeaea]">
              {socials.map((social) => {
                return (
                  <a href={social.link} className="text-[1.4rem]">
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
