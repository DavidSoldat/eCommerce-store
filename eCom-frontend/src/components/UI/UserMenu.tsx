import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import {
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/userSlice";
import { logoutUser } from "../../utils/api/auth";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const logedOn = user?.email;

  const dispatch = useDispatch();
  const isAdmin = user?.role === "ROLE_ADMIN";
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdmin = () => {
    navigate("/adminDashboard");
    setAnchorEl(null);
  };

  const handleCloseLogout = async () => {
    const response = await logoutUser();
    console.log(response);
    dispatch(logout());
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
      {logedOn ? (
        <div>
          <Button
            sx={{ minWidth: 0, padding: 0, margin: 0, color: "black" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <HiOutlineUserCircle size={24} />
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
            {isAdmin ? (
              <MenuItem
                onClick={handleCloseAdmin}
                className="flex justify-center gap-2"
              >
                <RiAdminLine />
                Admin Panel
              </MenuItem>
            ) : (
              <MenuItem
                onClick={handleCloseToProfile}
                className="flex justify-center gap-2 capitalize"
              >
                <HiOutlineCog />
                {user?.username || "Velura user"}
              </MenuItem>
            )}

            <MenuItem
              onClick={handleCloseLogout}
              className="flex justify-center gap-2"
            >
              <HiOutlineLogout />
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
