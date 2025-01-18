import { Link, Outlet } from 'react-router';
import Footer from './Footer';
import Navi from './Navi';

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='bg-black text-white text-center py-2 text-xs font-extralight'>
        Sign up and get 20% off to your first order.{' '}
        <Link to='/register' className='underline font-normal'>
          Sign Up Now
        </Link>
      </div>
      <Navi />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
