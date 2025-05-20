import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ChangePasswordModal } from "../components/MODALS/ChangePasswordModal";
import { RootState } from "../redux/store";
import { capitalize } from "../utils/helpers";
import { deleteAccount } from "../utils/auth";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Profilepage() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

  const role = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (user === null || role === true) {
      navigate("/");
    }
  }, [navigate, role, user]);

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  const handleOpenDeleteAccountModal = () => {
    setOpenDeleteAccountModal(true);
  };

  const handleCloseModals = () => {
    setOpenChangePasswordModal(false);
    setOpenDeleteAccountModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(); 

      if (response?.status === 200) {
        toast.success("Account deleted!");
        dispatch(logout());
        navigate("/");
        handleCloseModals();
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting your account.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-10 flex flex-col gap-3 md:my-20">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <div className="flex flex-col gap-3 rounded-md bg-[#f0f0f0] p-5 md:w-3/5">
            <h3 className="text-xl font-semibold">User ID</h3>
            <p>#{user?.id}</p>
            <h3 className="text-xl font-semibold">Name</h3>
            <p>{capitalize(user?.username || "")}</p>
            <h3 className="text-xl font-semibold">Email: </h3>
            <p>{user?.email}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-md bg-[#f0f0f0] p-5 md:w-2/5 md:justify-center">
            <button
              className="w-fit rounded-md px-4 py-2 text-lg font-semibold text-blue-400 hover:text-blue-800"
              onClick={handleOpenChangePasswordModal}
            >
              Change password
            </button>
            <Divider />
            <button
              className="w-fit rounded-md px-4 py-2 text-lg font-semibold text-red-400 hover:text-red-800"
              onClick={handleOpenDeleteAccountModal}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openChangePasswordModal}
        onClose={handleCloseModals}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
      >
        <ChangePasswordModal handleClose={handleCloseModals} />
      </Modal>

      <Modal
        open={openDeleteAccountModal}
        onClose={handleCloseModals}
        aria-labelledby="delete-account-modal-title"
        aria-describedby="delete-account-modal-description"
      >
        <div className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-5 text-center shadow-lg">
          <h2
            id="delete-account-modal-title"
            className="mb-4 text-xl font-semibold"
          >
            Delete Account
          </h2>
          <p
            id="delete-account-modal-description"
            className="mb-6 text-gray-700"
          >
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteAccount}
              className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCloseModals}
              className="rounded-md bg-gray-300 px-4 py-2 text-black transition-colors hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
