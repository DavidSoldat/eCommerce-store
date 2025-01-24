import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import Login from '../components/Login';
import Register from '../components/Register';

export default function LoginRegister() {
  const location = useLocation();
  const [path, setPath] = useState<string>('');
  
  useEffect(() => {
    const pathName = location.pathname.slice(1);
    setPath(pathName);

  },[location.pathname])

  return (
  <div className="mx-auto max-w-[1240px] px-4 h-full">
    <Divider/>
    <div className='flex items-center flex-col gap-4 justify-center min-h-[500px]'>
      <div className='text-2xl font-semibold'>
        <Link to='/login' className={`${path === 'login' ? 'underline' : 'text-gray-500 font-medium'}`}>Login</Link> / <Link to='/register' className={`${path === 'register' ? 'underline text-2xl' : 'text-gray-500 font-medium'}`}>Register</Link>
      </div>
      {path === 'login' ? <Login/> : <Register/>}
    </div>
  </div>)
}
