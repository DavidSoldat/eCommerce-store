import { Breadcrumbs, Divider, Typography } from '@mui/material';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';
import cartItem from '../assets/items/cartItem.png';
import cartItem1 from '../assets/items/cartItem1.png';
import cartItem2 from '../assets/items/cartItem2.png';
import CartItem from '../components/CartItem';
import Newsletter from '../components/Newsletter';

export default function Cartpage() {
  return (
    <div className='h-full max-w-[1240px] mx-auto px-4'>
      <Divider />
      <div className='mb-10 mt-5'>
        <Breadcrumbs aria-label='breadcrumb' separator='›'>
          <Link className='hover:underline' to='/'>
            Home
          </Link>
          <Typography color='text.primary'>Cart</Typography>
        </Breadcrumbs>
        <h2 className='uppercase text-2xl font-bold font-[IntegralCF] my-3'>
          Your cart
        </h2>
        <div className='mt-2 flex flex-col gap-4 md:flex-row '>
          <div className='border rounded-20 p-3 flex flex-col gap-y-3 md:w-3/5'>
            <CartItem
              image={cartItem}
              title='Gradient Graphic T-shirt'
              size='Large'
              color='White'
              price={145}
              quantity={1}
            />
            <Divider />

            <CartItem
              image={cartItem1}
              title='Checkered Shirt'
              size='Medium'
              color='Red'
              price={180}
              quantity={1}
            />
            <Divider />

            <CartItem
              image={cartItem2}
              title='Skinny Fit Jeans'
              size='Large'
              color='Blue'
              price={240}
              quantity={1}
            />
          </div>
          <div className='border rounded-20 p-3 flex flex-col gap-y-3 md:w-2/5 md:h-fit'>
            <h3 className='text-xl font-bold'>Order Summary</h3>
            <div className='flex justify-between'>
              <p className='text-black opacity-70'>Subtotal</p>
              <span className='font-bold text-base'>$565</span>
            </div>
            <div className='flex justify-between'>
              <p className='text-black opacity-70'>Discount (-20%)</p>
              <span className='font-bold text-[#ff3333] text-base'> -$113</span>
            </div>
            <div className='flex justify-between'>
              <p className='text-black opacity-70'>Delivery Fee</p>
              <span className='font-bold text-base'>$15</span>
            </div>
            <Divider />
            <div className='flex justify-between'>
              <p>Total</p>
              <span className='font-bold text-xl'>$467</span>
            </div>
            <button className='flex  w-full py-3 bg-black text-white rounded-60 items-center justify-center'>
              <span className='flex justify-between items-center gap-2 text-sm'>
                Go to Checkout <FaArrowRightLong color='white' />
              </span>
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
