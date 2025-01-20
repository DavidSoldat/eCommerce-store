import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "./components/Layout";
import LoginRegister from "./pages/LoginRegister";

import ScrollToTop from "./components/ScrollTop";
import Homepage from "./pages/HomePage";
import Shoppage from "./pages/ShopPage";
import Productpage from "./pages/ProductPage";
import Cartpage from "./pages/CartPage";

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
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/shop" element={<Shoppage />} />
            <Route path="/shop/product" element={<Productpage />} />
            <Route path="/cart" element={<Cartpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
