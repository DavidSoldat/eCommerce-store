import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

import ScrollToTop from "./components/ScrollTop";
import Layout from "./components/UI/Layout";
import Cartpage from "./pages/Cartpage";
import Homepage from "./pages/Homepage";
import LoginRegister from "./pages/LoginRegister";
import Productpage from "./pages/Productpage";
import Shoppage from "./pages/Shoppage";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AdminDashboard from "./pages/AdminDashboard";
import Brandspage from "./pages/Brandspage";
import CategoryPage from "./pages/CategoryPage";
import NotFoundpage from "./pages/NotFoundpage";
import Profilepage from "./pages/Profilepage";
import { store } from "./redux/store";
import OAuthHandler from "./pages/OAuthHandler";

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
        <Provider store={store}>
          <Toaster />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<Profilepage />} />
              <Route path="/brands" element={<Brandspage />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/register" element={<LoginRegister />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/oauth-callback" element={<OAuthHandler />} />
              <Route path="/shop" element={<Shoppage />} />
              <Route path="/shop/:category" element={<CategoryPage />} />
              <Route path="/shop/:category/product" element={<Productpage />} />
              <Route path="/cart" element={<Cartpage />} />
              <Route path="*" element={<NotFoundpage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
