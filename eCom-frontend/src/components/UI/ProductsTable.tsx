import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Product } from "../../utils/Models";
import { deleteProducts } from "../../utils/products";

export default function ProductsTable({
  products,
}: {
  products: Product[] | [];
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(products);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "productName", headerName: "Name", flex: 1 },
    { field: "productPrice", headerName: "Price", width: 105 },
    { field: "productDescription", headerName: "Description", flex: 1 },
    { field: "productSizes", headerName: "Sizes", width: 105 },
    { field: "productColors", headerName: "Colors", flex: 1 },
    { field: "productQuantity", headerName: "Quantity", width: 105 },
    { field: "productDiscount", headerName: "Discount", width: 105 },
    { field: "productCategory", headerName: "Category", width: 105 },
    { field: "genderCategory", headerName: "Gender", width: 105 },

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
        </div>
      ),
    },
  ];

  const handleDelete = (ids: number[]) => {
    try {
      deleteProducts(ids);
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedRows.includes(row.id)),
      );
    } catch (error) {
      console.error(error);
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
