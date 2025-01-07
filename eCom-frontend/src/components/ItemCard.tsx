import { Box, Rating } from '@mui/material';
import { useState } from 'react';
import item from '../assets/items/item.png';

export default function ItemCard() {
  const [value] = useState<number | null>(4.5);

  return (
    <div className='w-fit flex flex-col gap-1'>
      <img src={item} alt='product' className='rounded-13 w-full' />
      <h3 className='text-base font-bold truncate mt-1'>
        T-shirt with Tape Details
      </h3>
      <Box sx={{ '& > legend': { mt: 2 } }} className='flex items-center gap-3'>
        <Rating
          name='read-only'
          precision={0.5}
          value={value}
          size='small'
          readOnly
        />
        <span className='text-xs text-black opacity-60'>{value}/5</span>
      </Box>
      <p className='text-xl font-bold pb-2'>$120</p>
    </div>
  );
}
