import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenu, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleShopSubmenu = () => {
    setIsShopOpen(!isShopOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div>
      <button onClick={toggleMenu} className="p-2 focus:outline-none">
        <HiOutlineMenu size={22} />
      </button>

      <div
        ref={menuRef}
        className={`fixed left-0 top-0 z-20 h-full w-64 transform border-r bg-[#f0f0f0] text-black transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute right-4 top-4 p-2 text-black focus:outline-none"
        >
          <IoCloseOutline size={26} />
        </button>

        <ul className="mt-16 space-y-4 p-4">
          <li>
            <Link to="/" onClick={toggleMenu} className="block">
              Home
            </Link>
          </li>
          <Divider />
          <li>
            <button
              onClick={toggleShopSubmenu}
              className="flex w-full items-center justify-between focus:outline-none"
            >
              <span>Shop</span>
              <span className={`} transform transition-transform`}>
                {!isShopOpen ? <HiOutlinePlus /> : <HiOutlineMinus />}
              </span>
            </button>

            {isShopOpen && (
              <ul className="mt-2 space-y-2 pl-4">
                <li>
                  <Link to="#" onClick={toggleMenu} className="block">
                    Man
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={toggleMenu} className="block">
                    Woman
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <Divider />

          <li>
            <Link to="#" onClick={toggleMenu} className="block">
              On Sale
            </Link>
          </li>
          <Divider />
          <li>
            <Link to="/" onClick={toggleMenu} className="block">
              New Arrivals
            </Link>
          </li>
          <Divider />
          <li>
            <Link to="/" onClick={toggleMenu} className="block">
              Brands
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
