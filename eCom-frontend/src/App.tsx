import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "./components/UI/Layout";
import ScrollToTop from "./components/ScrollTop";
import Cartpage from "./pages/Cartpage";
import Homepage from "./pages/Homepage";
import LoginRegister from "./pages/LoginRegister";
import Productpage from "./pages/Productpage";
import Shoppage from "./pages/Shoppage";

import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserProvider";
import Profilepage from "./pages/Profilepage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundpage from "./pages/NotFoundpage";

export default function App() {
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          TouchRippleProps: {
            classes: {
              rippleVisible: "custom-ripple",
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <UserProvider>
          <Toaster />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<Profilepage />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/register" element={<LoginRegister />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/shop" element={<Shoppage />} />
              <Route path="/shop/product" element={<Productpage />} />
              <Route path="/cart" element={<Cartpage />} />
              <Route path="*" element={<NotFoundpage />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
