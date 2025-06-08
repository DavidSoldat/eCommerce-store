import { useNavigate, useSearchParams } from "react-router";

import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddBrandModal } from "../components/MODALS/AddBrandModal";
import { EditBrandModal } from "../components/MODALS/EditBrandModal";
import { EditUserModal } from "../components/MODALS/EditUserModal";
import BrandsTable from "../components/TABLES/BrandsTable";
import ProductsTable from "../components/TABLES/ProductsTable";
import UsersTable from "../components/TABLES/UsersTable";
import { RootState } from "../redux/store";
import { ProductDetailsDto } from "../utils/DTO";
import { Brand, UserInfo } from "../utils/types";
import { ProductModal } from "../components/MODALS/EditProductModal";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("table") || "stats",
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailsDto | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state?.user);

  useEffect(() => {
    if (user.email !== null) {
      const isAdmin = user.role === "ROLE_ADMIN";
      if (!isAdmin) {
        navigate("/");
      }
    }
  }, [navigate, user]);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  const renderTable = () => {
    switch (activeTab) {
      case "brands":
        return (
          <BrandsTable
            handleOpenModal={handleOpenModal}
            setSelectedBrand={setSelectedBrand}
            setModalType={setModalType}
          />
        );
      case "products":
        return (
          <ProductsTable
            handleOpenModal={handleOpenModal}
            setSelectedProduct={setSelectedProduct}
            setModalType={setModalType}
          />
        );
      case "users":
        return (
          <UsersTable
            handleOpenModal={handleOpenModal}
            setModalType={setModalType}
            setSelectedUser={setSelectedUser}
          />
        );
    }
  };

  const renderModal = () => {
    switch (modalType) {
      case "editProduct":
        return (
          <ProductModal
            product={selectedProduct}
            type={"edit"}
            handleClose={handleCloseModal}
          />
        );
      case "editUser":
        return (
          <EditUserModal user={selectedUser} handleClose={handleCloseModal} />
        );
      case "addBrand":
        return <AddBrandModal handleClose={handleCloseModal} />;
      case "editBrand":
        return (
          <EditBrandModal
            brand={selectedBrand}
            handleClose={handleCloseModal}
          />
        );
      case "addProduct":
        return <ProductModal type={"add"} handleClose={handleCloseModal} />;
    }
  };

  const handleClick = (tableName: string) => {
    setSearchParams({ table: tableName });
    setActiveTab(tableName);
  };

  return (
    <div className="mx-auto min-h-screen px-4">
      <Divider />
      <div className="my-5 flex flex-col items-center gap-20">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-around divide-x border-x border-t">
            <button
              className={`w-1/3 px-4 py-2 text-center ${activeTab === "stats" ? "bg-[#f0f0f0] font-semibold text-black" : "rounded-ss-20 bg-white"}`}
              onClick={() => handleClick("stats")}
            >
              Stats
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${activeTab === "users" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => handleClick("users")}
            >
              Users
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${activeTab === "products" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => handleClick("products")}
            >
              Products
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${activeTab === "brands" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => handleClick("brands")}
            >
              Brands
            </button>
          </div>
          <div className="w-full bg-[#f0f0f0] p-10">{renderTable()}</div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>{renderModal()}</>
      </Modal>
    </div>
  );
}
