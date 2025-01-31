import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      <Link className="hover:underline" to="/">
        Home
      </Link>
      {pathNames.map((value, index) => {
        const to = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;

        return isLast ? (
          <Typography key={index} className="capitalize text-black">
            {decodeURIComponent(value)}
          </Typography>
        ) : (
          <Link to={to} key={index} className="capitalize hover:underline">
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
