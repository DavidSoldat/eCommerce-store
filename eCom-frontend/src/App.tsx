import { createTheme, ThemeProvider } from '@mui/material';
import Footer from './components/Footer';
import Navi from './components/Navi';
import Homepage from './pages/Homepage';

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
      <div>
        <div className='bg-black text-white text-center py-2 text-xs font-extralight'>
          Sign up and get 20% off to your first order.{' '}
          <button className='underline font-normal'>Sign Up Now</button>
        </div>
        <Navi />
        <Homepage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
