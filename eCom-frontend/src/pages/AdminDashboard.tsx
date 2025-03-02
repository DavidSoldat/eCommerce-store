import { useNavigate } from "react-router";
import { getUsers } from "../utils/auth";

import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { EditModal } from "../components/UI/EditModal";
import ProductsTable from "../components/UI/ProductsTable";
import UsersTable from "../components/UI/UsersTable";
import { RootState } from "../redux/store";
import { Product, UserInfo } from "../utils/Models";

export default function AdminDashboard() {
  const prods: Product[] = [
    {
      id: 1,
      productName: "Jon",
      productDescription: "davidsoldat00@gmail.com",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 2,
      productDescription: "Lannister",
      productName: "Cersei",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "woman",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 3,
      productDescription: "Lannister",
      productName: "Jaime",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 4,
      productDescription: "Stark",
      productName: "Arya",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 5,
      productDescription: "Targaryen",
      productName: "Daenerys",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 6,
      productDescription: "Melisandre",
      productName: "some name",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "woman",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 7,
      productDescription: "Clifford",
      productName: "Ferrara",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 8,
      productDescription: "Frances",
      productName: "Rossini",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "man",
      productPrice: 120,
      reviews: [],
    },
    {
      id: 9,
      productDescription: "Roxie",
      productName: "Harvey",
      productSizes: ["s", "l"],
      productQuantity: 20,
      productColors: ["red", "green", "blue"],
      productDiscount: 10,
      productRating: 4.3,
      productCategory: "woman",
      productPrice: 120,
      reviews: [],
    },
  ];
  const navigate = useNavigate();
  const [panel, setPanel] = useState("stats");
  const [products] = useState(prods);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<UserInfo | null>(null);

  const user = useSelector((state: RootState) => state?.user);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      const users = response.data.data;
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const isAdmin = user?.role === "ROLE_ADMIN";
    if (!isAdmin) {
      navigate("/");
    }
  }, [navigate, user?.role]);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1240px] px-4">
      <Divider />
      <div className="my-5 flex flex-col items-center gap-20">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
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
          </div>
          <div className="w-full bg-[#f0f0f0] p-10">
            {panel === "products" && <ProductsTable products={products} />}
            {panel === "users" && (
              <UsersTable
                data={users}
                handleOpenModal={handleOpenModal}
                setSelectedEdit={setSelectedEdit}
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
        <EditModal user={selectedEdit} handleClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
