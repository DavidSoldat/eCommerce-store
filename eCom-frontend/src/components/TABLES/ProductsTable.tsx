import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { Product } from "../../utils/types";
import { ProductDetailsDto } from "../../utils/DTO";
import { deleteProducts, getProducts } from "../../utils/api/products";

export default function ProductsTable({
  handleOpenModal,
  setSelectedProduct,
  setModalType,
}: {
  handleOpenModal: () => void;
  setSelectedProduct: (product: ProductDetailsDto) => void;
  setModalType: (modal: string) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "productName", headerName: "Name", flex: 1 },
    { field: "productPrice", headerName: "Price", width: 105 },
    { field: "productDescription", headerName: "Description", flex: 1 },
    { field: "brandName", headerName: "Brand", flex: 1 },
    { field: "sizes", headerName: "Sizes", width: 105 },
    { field: "colors", headerName: "Colors", flex: 1 },
    { field: "productQuantity", headerName: "Quantity", width: 105 },
    { field: "productDiscount", headerName: "Discount", width: 105 },
    { field: "categoryName", headerName: "Category", width: 105 },
    { field: "genderCategory", headerName: "Gender", width: 105 },

    {
      field: "action",
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
              setSelectedProduct(params.row);
              handleOpenModal();
              setModalType("editProduct");
              event.stopPropagation();
            }}
          >
            <FaEdit size={20} />
          </IconButton>
        </div>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setRows(response);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (ids: number[]) => {
    try {
      deleteProducts(ids);
      setRows((prevRows) =>
        prevRows.filter((row: Product) => !selectedRows.includes(row.id)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    handleOpenModal();
    setModalType("addProduct");
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
      <div className="flex justify-between">
        <Button
          variant="contained"
          color="error"
          sx={{ width: 200, marginTop: 2 }}
          disabled={selectedRows.length === 0}
          onClick={() => handleDelete(selectedRows)}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: 200, marginTop: 2 }}
          onClick={() => handleAddProduct()}
        >
          Add new
        </Button>
      </div>
    </>
  );
}
