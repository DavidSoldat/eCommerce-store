import { Divider } from '@mui/material';
import Newsletter from '../components/Newsletter';

export default function Cartpage() {
  return (
    <div className='h-full max-w-[1240px] mx-auto'>
      <Divider />
      <div className='flex-grow'>cart page</div>
      <Newsletter />
    </div>
  );
}
