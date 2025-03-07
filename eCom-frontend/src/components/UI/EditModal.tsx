import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { editUser } from "../../utils/auth";
import { editModalStyle } from "../../utils/constants";
import { UserInfo } from "../../utils/Models";
import { editUserSchema } from "../../utils/zodSchemas";

export const EditModal = forwardRef(
  (
    {
      user,
      handleClose,
      fetchData,
    }: {
      user: UserInfo | null;
      handleClose: () => void;
      fetchData: () => void;
    },
    ref,
  ) => {
    type FormData = z.infer<typeof editUserSchema>;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(editUserSchema),
      defaultValues: user as FormData,
    });

    async function onSubmit(data: FormData) {
      try {
        const response = await editUser(data);
        if (response?.status === 200) {
          handleClose();
          fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">Edit user {user?.id}</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-5 rounded-13 border p-5"
          >
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  disabled={true}
                  id="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.email ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.email && (
                <span className="self-end text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="username" className="w-1/4">
                  Username
                </label>
                <input
                  {...register("username")}
                  type="username"
                  id="username"
                  placeholder="Enter username"
                  autoComplete="off"
                  className={`w-3/4 rounded-13 border px-3 py-1 ${errors.username ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.username && (
                <span className="self-end text-xs text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="roles">Roles</label>
                <select
                  {...register("role")}
                  id="roles"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.role ? "border-red-500 text-sm" : ""}`}
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_ADMIN">Admin</option>
                </select>
              </div>
              {errors.role && (
                <span className="self-end text-xs text-red-500">
                  {errors.role.message}
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
