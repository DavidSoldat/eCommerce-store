import { Divider } from '@mui/material';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footer() {
  return (
    <div className='bg-[#f0f0f0] '>
      <div className='py-8 px-4 mt-2 flex flex-col gap-3 mx-auto max-w-[1240px]'>
        <h2 className='uppercase text-3xl font-extrabold font-[IntegralCF] text-left'>
          Velura.co
        </h2>
        <p className='text-sm text-black opacity-60'>
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>
        <div className='flex justify-between'>
          <div className='flex gap-4 my-2'>
            <BsFacebook size={24} />
            <BsInstagram size={24} />
            <BsTwitter size={24} />
          </div>
          <a
            href='https://github.com/DavidSoldat'
            className='text-sm text-black opacity-60'
          >
            David Soldat 2025
          </a>
        </div>
        <Divider />
        <p className='text-sm text-black opacity-60 text-center'>
          Velura.co © 2025, All Rights Reserved
        </p>
      </div>
    </div>
  );
}
