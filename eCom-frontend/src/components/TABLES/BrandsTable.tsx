import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Brand } from "../../utils/types";
import { deleteBrands, getBrands } from "../../utils/api/products";
import toast from "react-hot-toast";

export default function BrandsTable({
  handleOpenModal,
  setSelectedBrand,
  setModalType,
}: {
  handleOpenModal: () => void;
  setSelectedBrand: (brand: Brand) => void;
  setModalType: (type: string) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setRows(response);
    } catch (error) {
      console.error("Error fetching brands: ", error);
      toast.error(error as string);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
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
              setSelectedBrand(params.row);
              handleOpenModal();
              setModalType("editBrand");
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
      deleteBrands(ids);
      setRows((prevRows) =>
        prevRows.filter((row: Brand) => !selectedRows.includes(row.id)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBrand = () => {
    handleOpenModal();
    setModalType("addBrand");
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
          onClick={() => handleAddBrand()}
        >
          Add new
        </Button>
      </div>
    </>
  );
}
