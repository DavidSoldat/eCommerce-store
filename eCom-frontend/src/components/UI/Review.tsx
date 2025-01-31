import { useState } from 'react';
import { Box, Rating } from '@mui/material';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

export default function Review({ wide }: { wide?: string }) {
  const [value] = useState<number | null>(5.0);

  return (
    <div
      className={`${
        wide == 'wide' ? 'max-w-[600px]' : 'max-w-96'
      } min-w-80 border rounded-20 p-6 flex flex-col gap-2`}
    >
      <Box sx={{ '& > legend': { mt: 2 } }} className='flex items-center gap-3'>
        <Rating
          name='read-only'
          precision={0.5}
          value={value}
          size='medium'
          readOnly
        />
      </Box>
      <h2 className='flex items-center gap-2 text-base font-semibold'>
        Sarah M.
        <span>
          <RiVerifiedBadgeFill color='green' />
        </span>
      </h2>
      <p className='text-sm text-black opacity-70'>
        "I'm blown away by the quality and style of the clothes I received from
        Shop.co. From casual wear to elegant dresses, every piece I've bought
        has exceeded my expectations.”
      </p>
    </div>
  );
}
