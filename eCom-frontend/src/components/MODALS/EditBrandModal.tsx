import { forwardRef } from "react";
import { Brand } from "../../utils/types";
import { editBrandSchema } from "../../utils/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { editModalStyle } from "../../utils/constants";
import { z } from "zod";
import { editBrand } from "../../utils/api/products";
import toast from "react-hot-toast";

export const EditBrandModal = forwardRef(
  (
    {
      brand,
      handleClose,
    }: {
      brand: Brand | null;
      handleClose: () => void;
    },
    ref,
  ) => {
    type FormData = z.infer<typeof editBrandSchema>;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(editBrandSchema),
      defaultValues: brand as FormData,
    });

    async function onSubmit(data: FormData) {
      try {
        const response = await editBrand(data);
        console.log(response);
        toast.success("Brand name updated");
      } catch (error) {
        console.error(error);
        toast.error("Error updating brand");
      } finally {
        handleClose();
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">Edit brand {brand?.id}</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-5 rounded-13 border p-5"
          >
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  type="name"
                  id="name"
                  placeholder="Enter name"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.name ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.name && (
                <span className="self-end text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <button className="mx-auto mt-10 w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800">
              Submit
            </button>
          </form>
        </div>
      </Box>
    );
  },
);
