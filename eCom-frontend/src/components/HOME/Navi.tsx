import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router";
import MobileNavBar from "./MobileNavbar";
import UserMenu from "../UI/UserMenu";

export default function Navi() {
  const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorE1);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <div className="w-full">
      <MobileNavBar />
      {/* desktop */}
      <div className="mx-auto hidden max-w-[1240px] items-center justify-between px-2 pb-4 pt-5 md:flex">
        <Link
          to="/"
          className="mb-[-5px] block align-middle font-[IntegralCF] text-3xl font-bold uppercase leading-none"
        >
          Velura.Co
        </Link>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
            borderRadius: "10px",
            paddingX: "10px",
          }}
        >
          <p className="flex items-center text-base capitalize text-black">
            Shop <MdArrowDropDown />
          </p>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorE1}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>Men</MenuItem>
          <MenuItem>Women</MenuItem>
        </Menu>
        <Button
          sx={{
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
            borderRadius: "10px",
            paddingX: "10px",
          }}
        >
          <p className="flex items-center text-base capitalize text-black">
            On Sale
          </p>
        </Button>
        <Button
          sx={{
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
            borderRadius: "10px",
            paddingX: "10px",
          }}
        >
          <p className="flex items-center text-base capitalize text-black">
            New Arrivals
          </p>
        </Button>
        <Button
          sx={{
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
            borderRadius: "10px",
            paddingX: "10px",
          }}
        >
          <p className="flex items-center rounded-20 text-base capitalize text-black">
            Brands
          </p>
        </Button>
        <input
          type="search"
          className="rounded-60 bg-[#f0f0f0] px-4 py-3 text-black opacity-90"
          placeholder="Search for products..."
        />

        <div className="flex items-center gap-3">
          <Link to="/cart">
            <HiOutlineShoppingCart size={24} />
          </Link>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
