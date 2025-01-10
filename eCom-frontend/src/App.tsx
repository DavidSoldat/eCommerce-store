import { createTheme, ThemeProvider } from '@mui/material';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router';
import Productpage from './pages/Productpage';
import Layout from './components/Layout';
import LoginRegister from './pages/LoginRegister';
import Shoppage from './pages/Shoppage';
import Cartpage from './pages/Cartpage';

export default function App() {
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          TouchRippleProps: {
            classes: {
              rippleVisible: 'custom-ripple',
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Homepage />} />
            <Route path='/product' element={<Productpage />} />
            <Route path='/register' element={<LoginRegister />} />
            <Route path='/login' element={<LoginRegister />} />
            <Route path='/shop' element={<Shoppage />} />
            <Route path='/cart' element={<Cartpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
