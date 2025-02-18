import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Product } from "../../utils/Models";

export default function ProductsTable({ products }: { products: Product[] }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(products);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "productName", headerName: "Name", flex: 1 },
    { field: "productPrice", headerName: "Price", width: 70 },
    { field: "productDescription", headerName: "Description", flex: 1 },
    { field: "productSizes", headerName: "Sizes", width: 70 },
    { field: "productColors", headerName: "Colors", flex: 1 },
    { field: "productQuantity", headerName: "Quantity", width: 70 },
    { field: "productDiscount", headerName: "Discount", width: 70 },
    { field: "productRating", headerName: "Rating", width: 70 },
    { field: "productCategory", headerName: "Category", width: 70 },

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
            prevRows.filter((row) => !selectedRows.includes(row.id as number)),
          )
        }
      >
        Delete Selected
      </Button>
    </>
  );
}
