import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deleteUsers, getUsers } from "../../utils/api/auth";
import { UserInfo } from "../../utils/types";
import toast from "react-hot-toast";

export default function UsersTable({
  handleOpenModal,
  setSelectedUser,
  setModalType,
}: {
  handleOpenModal: () => void;
  setSelectedUser: (user: UserInfo) => void;
  setModalType: (type: string) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "User role",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            width: "100%",
          }}
        >
          <IconButton
            onClick={(event) => {
              setSelectedUser(params.row);
              handleOpenModal();
              setModalType("editUser");
              event.stopPropagation();
            }}
          >
            <FaEdit size={20} />
          </IconButton>
        </div>
      ),
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setRows(response);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (ids: number[]) => {
    try {
      await deleteUsers(ids);
      setRows((prevRows) =>
        prevRows.filter((row: UserInfo) => !ids.includes(row.id)),
      );

      toast.success("Users successfully deleted!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to delete users:", error);

      if (error.response && error.response.data) {
        toast.error(`Error deleting users: ${error.response.data}`);
      } else {
        toast.error("An unexpected error occurred during deletion.");
      }
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
      <Paper sx={{ height: 370, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection as number[]);
          }}
          sx={{
            border: 0,
          }}
        />
      </Paper>
      <Button
        variant="contained"
        color="error"
        sx={{ width: 200, marginTop: 2 }}
        disabled={selectedRows.length === 0}
        onClick={() => handleDelete(selectedRows)}
      >
        Delete Selected
      </Button>
    </>
  );
}
