import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editModalStyle } from "../../utils/constants";
import { changePasswordSchema } from "../../utils/zodSchemas";

export const ChangePasswordModal = forwardRef(
  ({ handleClose }: { handleClose: () => void }, ref) => {
    type FormData = z.infer<typeof changePasswordSchema>;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(changePasswordSchema),
    });

    async function onSubmit(data: FormData) {
      try {
        console.log(data);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <h2 className="text-center text-xl font-semibold">Change password</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-3 flex flex-col items-start gap-5 rounded-13 p-5"
        >
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="oldPassword" className="whitespace-nowrap">
                Old Password
              </label>
              <input
                {...register("oldPassword")}
                type="password"
                id="oldPassword"
                placeholder="Enter oldPassword"
                autoComplete="off"
                className={`flex-1 rounded-13 border px-3 py-1 ${errors.oldPassword ? "border-red-500 text-sm" : ""}`}
              />
            </div>
            {errors.oldPassword && (
              <span className="self-end text-xs text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="newPassword" className="whitespace-nowrap">
                New Password
              </label>
              <input
                {...register("newPassword")}
                type="password"
                id="newPassword"
                placeholder="Enter newPassword"
                autoComplete="off"
                className={`flex-1 rounded-13 border px-3 py-1 ${errors.newPassword ? "border-red-500 text-sm" : ""}`}
              />
            </div>
            {errors.newPassword && (
              <span className="self-end text-xs text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="confirmPassword" className="whitespace-nowrap">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                placeholder="Enter confirmPassword"
                autoComplete="off"
                className={`flex-1 rounded-13 border px-3 py-1 ${errors.confirmPassword ? "border-red-500 text-sm" : ""}`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="self-end text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="mt-5 flex w-full gap-3">
            <button className="w-1/2 rounded-20 bg-black px-4 py-2 text-white hover:bg-gray-800">
              Submit
            </button>
            <button
              onClick={handleClose}
              className="w-1/2 rounded-20 bg-gray-300 px-4 py-2 text-black transition-colors hover:bg-gray-400"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    );
  },
);
