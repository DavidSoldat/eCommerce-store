import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { UserRep } from "../../utils/Types";

export default function UsersTable({ data }: { data: UserRep[] }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(data);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "roles",
      headerName: "User role",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
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
              console.log("Edit", params.row.id);
              event.stopPropagation();
            }}
          >
            <FaEdit size={20} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <MdDeleteForever color="red" size={20} />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
        onClick={() =>
          setRows((prevRows) =>
            prevRows.filter((row) => !selectedRows.includes(row.id)),
          )
        }
      >
        Delete Selected
      </Button>
    </>
  );
}
