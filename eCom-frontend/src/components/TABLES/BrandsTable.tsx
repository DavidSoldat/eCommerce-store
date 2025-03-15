import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Brand } from "../../utils/Models";
import { deleteBrands } from "../../utils/products";

export default function BrandsTable({
  brands,
  handleOpenModal,
  setSelectedBrand,
  setModalType,
}: {
  brands: Brand[] | [];
  handleOpenModal: () => void;
  setSelectedBrand: (brand: Brand) => void;
  setModalType: (type: string) => void;
}) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(brands);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Brand", flex: 1 },
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
        prevRows.filter((row) => !selectedRows.includes(row.id)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBrand = () => {
    console.log("dd");
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
