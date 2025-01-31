import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { useUser } from "../../context/UserProvider";
import { isUserAdmin } from "../../utils/helpers";
import { RiAdminLine } from "react-icons/ri";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const token = localStorage.getItem("token");
  const isAdmin = isUserAdmin(token as string);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdmin = () => {
    navigate("/adminDashboard");
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setAnchorEl(null);
  };

  const handleCloseToProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <MenuItem
              onClick={handleCloseToProfile}
              className="flex justify-center gap-2 capitalize"
            >
              <span>
                <HiOutlineCog />
              </span>
              {user?.name || "Velura user"}
            </MenuItem>
            {isAdmin && (
              <MenuItem
                onClick={handleCloseAdmin}
                className="flex justify-center gap-2"
              >
                <span>
                  <RiAdminLine />
                </span>
                Admin Panel
              </MenuItem>
            )}
            <MenuItem
              onClick={handleCloseLogout}
              className="flex justify-center gap-2"
            >
              <span>
                <HiOutlineLogout />
              </span>
              Logout
            </MenuItem>
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
