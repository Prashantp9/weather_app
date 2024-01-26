import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiFolder, FiMessageSquare, FiShoppingCart } from "react-icons/fi";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Favourite from "./Favourite";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import Listpage from "./Listpage";
import { MdOutlineDashboard } from "react-icons/md";
import MoreInfo from "./MoreInfo";
import { RiSettings4Line } from "react-icons/ri";

const Home = () => {
  const [filter, setfilter] = useState("");
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "user", link: "/", icon: AiOutlineUser },

    { name: "Saved", link: "/saved", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(false);
  return (
    <section className="flex">
      <div
        className={`hidden md:block bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full fixed md:static flex justify-between items-center px-4 py-3 font-medium bg-slate-100  top-0 left-0 right-0">
          <div className="flex gap-3 items-center">
            <GiHamburgerMenu
              onClick={() => setOpen(!open)}
              className="w-7 h-7 md:hidden"
            />
            <Link
              className="text-lg md:text-base font-semibold text-slate-700"
              to="/"
            >
              Weather App
            </Link>
          </div>
          <div className="px-3 py-2 md:flex hidden justify-between items-center gap-1 bg-slate-100 shadow-lg rounded-md">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setfilter(e.target.value)}
              className="outline-none bg-transparent w-40 text-slate-700 text-sm"
            />
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
            </svg>
          </div>
        </div>

        <div className="w-full h-full px-4 py-14 md:py-4">
          <Routes>
            <Route path="/" element={<Listpage propFilter={filter} />} />
          </Routes>
          <Routes>
            <Route path="/weather/:city" element={<MoreInfo />}>
              {" "}
            </Route>
          </Routes>
          <Routes>
            <Route path="/saved" element={<Favourite />}>
              {" "}
            </Route>
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Home;
