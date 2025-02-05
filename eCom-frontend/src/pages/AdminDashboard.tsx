import { useNavigate } from "react-router";
import { flattenUser, isUserAdmin } from "../utils/helpers";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Table from "../components/UI/UsersTable";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { UserRep } from "../utils/Types";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [panel, setPanel] = useState("stats");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          "http://localhost:8080/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const users = response.data.data.map((user: UserRep) =>
          flattenUser(user),
        );
        console.log(users);
        console.log(response.data.data);
        setData(users);
      } catch (error) {
        console.error("Error fetching users", error);
        toast.error("Error fetching users");
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const isAdmin = isUserAdmin(token as string);
    if (!isAdmin) {
      navigate("/");
    }
  }, [navigate, token]);
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
            {panel === "users" && <Table data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// [
//     { id: 1, email: "davidsoldat00@gmail.com", username: "Jon", role: "user" },
//     { id: 2, email: "Lannister", username: "Cersei", role: "user" },
//     { id: 3, email: "Lannister", username: "Jaime", role: "user" },
//     { id: 4, email: "Stark", username: "Arya", role: "user" },
//     { id: 5, email: "Targaryen", username: "Daenerys", role: "user" },
//     { id: 6, email: "Melisandre", username: null, role: "user" },
//     { id: 7, email: "Clifford", username: "Ferrara", role: "user" },
//     { id: 8, email: "Frances", username: "Rossini", role: "user" },
//     { id: 9, email: "Roxie", username: "Harvey", role: "user" },
//   ]
