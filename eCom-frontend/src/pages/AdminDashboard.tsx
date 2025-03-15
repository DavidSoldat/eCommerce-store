import { useNavigate } from "react-router";
import { getUsers } from "../utils/auth";

import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { EditProductModal } from "../components/MODALS/EditProductModal";
import { EditUserModal } from "../components/MODALS/EditUserModal";
import BrandsTable from "../components/TABLES/BrandsTable";
import ProductsTable from "../components/TABLES/ProductsTable";
import UsersTable from "../components/TABLES/UsersTable";
import { RootState } from "../redux/store";
import { Brand, Category, ProductDetailsDto, UserInfo } from "../utils/Models";
import { getBrands, getCategories, getProducts } from "../utils/products";
import { AddBrandModal } from "../components/MODALS/AddBrandModal";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState("stats");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailsDto | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state?.user);

  console.log(selectedBrand);
  const fetchData = async () => {
    try {
      const [
        userResponse,
        productsResponse,
        brandsResponse,
        categoriesResponse,
      ] = await Promise.all([
        getUsers(),
        getProducts(),
        getBrands(),
        getCategories(),
      ]);

      setUsers(userResponse);
      setCategories(categoriesResponse);
      setProducts(productsResponse);
      setBrands(brandsResponse);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="mx-auto min-h-screen px-4">
      <Divider />
      <div className="my-5 flex flex-col items-center gap-20">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-around divide-x border-x border-t">
            <button
              className={`w-1/3 px-4 py-2 text-center ${panel === "stats" ? "bg-[#f0f0f0] font-semibold text-black" : "rounded-ss-20 bg-white"}`}
              onClick={() => setPanel("stats")}
            >
              Stats
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${panel === "users" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => setPanel("users")}
            >
              Users
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${panel === "products" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => setPanel("products")}
            >
              Products
            </button>
            <button
              className={`w-1/3 px-4 py-2 text-center ${panel === "brands" ? "bg-[#f0f0f0] font-semibold text-black" : "bg-white"}`}
              onClick={() => setPanel("brands")}
            >
              Brands
            </button>
          </div>
          <div className="w-full bg-[#f0f0f0] p-10">
            {panel === "products" && (
              <ProductsTable
                products={products}
                handleOpenModal={handleOpenModal}
                setSelectedProduct={setSelectedProduct}
                setModalType={setModalType}
              />
            )}
            {panel === "brands" && (
              <BrandsTable
                brands={brands}
                handleOpenModal={handleOpenModal}
                setSelectedBrand={setSelectedBrand}
                setModalType={setModalType}
              />
            )}
            {panel === "users" && (
              <UsersTable
                data={users}
                handleOpenModal={handleOpenModal}
                setSelectedUser={setSelectedUser}
                setModalType={setModalType}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {modalType === "editProduct" && (
            <EditProductModal
              product={selectedProduct}
              brands={brands}
              categories={categories}
              handleClose={handleCloseModal}
              fetchData={fetchData}
            />
          )}
          {modalType === "editUser" && (
            <EditUserModal
              user={selectedUser}
              handleClose={handleCloseModal}
              fetchData={fetchData}
            />
          )}
          {modalType === "addBrand" && (
            <AddBrandModal handleClose={handleCloseModal} />
          )}
        </>
      </Modal>
    </div>
  );
}
