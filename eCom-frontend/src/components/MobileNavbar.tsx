import React, { useState, useRef } from "react";

import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import UserMenu from "./UserMenu"; // Assuming you have a UserMenu component
import { Link } from "react-router";

const MobileNavBar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 0); // Focus the input after expansion
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle search logic
    console.log("Search submitted:", searchInputRef.current?.value);
    handleSearchClose();
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-5 md:hidden ${isSearchExpanded ? "gap-3" : ""}`}
    >
      <div className="flex items-center gap-4">
        <button>
          <HiOutlineMenu size={22} />
        </button>
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
