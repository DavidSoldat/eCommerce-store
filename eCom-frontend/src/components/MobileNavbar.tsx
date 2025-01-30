import React, { useRef, useState } from "react";

import { HiOutlineSearch, HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router";
import HamburgerMenu from "./HamburgerMenu";
import UserMenu from "./UserMenu";

const MobileNavBar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search submitted:", searchInputRef.current?.value);
    handleSearchClose();
  };

  return (
    // <div
    //   className={`sticky flex items-center justify-between px-4 py-5 md:hidden ${isSearchExpanded ? "gap-3" : ""}`}
    // >
    //   <div className="flex items-center gap-4">
    //     <HamburgerMenu />
    //     {!isSearchExpanded && (
    //       <Link
    //         to="/"
    //         className="mb-[-5px] block align-middle font-[IntegralCF] text-2xl font-bold uppercase leading-none"
    //       >
    //         Velura.Co
    //       </Link>
    //     )}
    //   </div>

    //   <div className="flex flex-grow items-center justify-end gap-3">
    //     <form
    //       onSubmit={handleSearchSubmit}
    //       className="flex items-center transition-all duration-300 ease-in-out"
    //       style={{
    //         width: isSearchExpanded ? "100%" : "0",
    //         opacity: isSearchExpanded ? 1 : 0,
    //         overflow: "hidden",
    //       }}
    //     >
    //       <input
    //         ref={searchInputRef}
    //         type="search"
    //         className="w-full rounded-60 bg-[#f0f0f0] px-2 py-1 text-black opacity-90 focus:outline-none focus:ring-0"
    //         placeholder="Search..."
    //       />
    //       {isSearchExpanded && (
    //         <button type="button" onClick={handleSearchClose} className="ml-2">
    //           <HiOutlineSearch size={22} />
    //         </button>
    //       )}
    //     </form>

    //     {!isSearchExpanded && (
    //       <button onClick={handleSearchClick}>
    //         <HiOutlineSearch size={22} />
    //       </button>
    //     )}

    //     <Link to="/cart">
    //       <HiOutlineShoppingCart size={22} />
    //     </Link>
    //     <UserMenu />
    //   </div>
    // </div>

    <div
      className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-white px-4 py-5 shadow-md md:hidden ${
        isSearchExpanded ? "gap-3" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <HamburgerMenu />
        {!isSearchExpanded && (
          <Link
            to="/"
            className="mb-[-5px] block align-middle font-[IntegralCF] text-2xl font-bold uppercase leading-none"
          >
            Velura.Co
          </Link>
        )}
      </div>

      <div className="flex flex-grow items-center justify-end gap-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center transition-all duration-300 ease-in-out"
          style={{
            width: isSearchExpanded ? "100%" : "0",
            opacity: isSearchExpanded ? 1 : 0,
            overflow: "hidden",
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            className="w-full rounded-60 bg-[#f0f0f0] px-2 py-1 text-black opacity-90 focus:outline-none focus:ring-0"
            placeholder="Search..."
          />
          {isSearchExpanded && (
            <button type="button" onClick={handleSearchClose} className="ml-2">
              <HiOutlineSearch size={22} />
            </button>
          )}
        </form>

        {!isSearchExpanded && (
          <button onClick={handleSearchClick}>
            <HiOutlineSearch size={22} />
          </button>
        )}

        <Link to="/cart">
          <HiOutlineShoppingCart size={22} />
        </Link>
        <UserMenu />
      </div>
    </div>
  );
};

export default MobileNavBar;
