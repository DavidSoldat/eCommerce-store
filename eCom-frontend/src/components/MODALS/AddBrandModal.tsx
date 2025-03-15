import { z } from "zod";
import { addBrandSchema } from "../../utils/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { editModalStyle } from "../../utils/constants";
import { addBrand } from "../../utils/products";
import { forwardRef } from "react";

export const AddBrandModal = forwardRef(
  ({ handleClose }: { handleClose: () => void }, ref) => {
    type FormData = z.infer<typeof addBrandSchema>;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(addBrandSchema),
    });

    async function onSubmit(data: FormData) {
      try {
        const response = await addBrand(data);
        if (response?.status === 200) {
          handleClose();
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">Add new brand</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-5 rounded-13 border p-5"
          >
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="brandName">Brand</label>
                <input
                  {...register("brandName")}
                  type="brandName"
                  disabled={true}
                  id="brandName"
                  placeholder="Enter brandName"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.brandName ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.brandName && (
                <span className="self-end text-xs text-red-500">
                  {errors.brandName.message}
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
