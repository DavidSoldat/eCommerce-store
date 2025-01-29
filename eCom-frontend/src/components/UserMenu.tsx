import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = localStorage.getItem("user");
  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          <Button
            sx={{ minWidth: 0, padding: 0, margin: 0, color: "black" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {<HiOutlineUserCircle size={24} />}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <Link
          to="/login"
          className="transition-transform duration-300 ease-in-out hover:scale-125"
        >
          <HiOutlineUserCircle size={24} />
        </Link>
      )}
    </div>
  );
}
