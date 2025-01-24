import { Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
} from 'react-icons/hi';
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router';

export default function Navi() {
  const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorE1);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorE1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <div className='w-full'>
      <div className='px-4 py-5 flex justify-between items-center md:hidden'>
        <div className='flex items-center gap-4'>
          <button>
            <HiOutlineMenu size={22} />
          </button>
          <Link
            to='/'
            className='text-2xl uppercase font-bold font-[IntegralCF] leading-none align-middle block mb-[-5px]'
          >
            Velura.Co
          </Link>
        </div>
        <div className='flex justify-end gap-3'>
          <button>
            <HiOutlineSearch size={22} />
          </button>
          <Link to='/cart'>
            <HiOutlineShoppingCart size={22} />
          </Link>
          <button>
            <HiOutlineUserCircle size={22} />
          </button>
        </div>
      </div>
      {/* desktop */}
      <div className='hidden md:flex pt-5 pb-4 px-2 max-w-[1240px] mx-auto items-center justify-between'>
        <Link
          to='/'
          className='text-3xl uppercase font-[IntegralCF] font-bold leading-none align-middle block mb-[-5px]'
        >
          Velura.Co
        </Link>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            ':hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <p className='flex items-center text-black capitalize text-base'>
            Shop <MdArrowDropDown />
          </p>
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorE1}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>Men</MenuItem>
          <MenuItem>Women</MenuItem>
        </Menu>
        <Button
          sx={{
            ':hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <p className='flex items-center text-black capitalize text-base'>
            On Sale
          </p>
        </Button>
        <Button
          sx={{
            ':hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <p className='flex items-center text-black capitalize text-base'>
            New Arrivals
          </p>
        </Button>
        <Button
          sx={{
            ':hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <p className='flex items-center text-black capitalize text-base'>
            Brands
          </p>
        </Button>
        <input
          type='search'
          className='bg-[#f0f0f0] rounded-60 text-black opacity-90 px-4 py-3'
          placeholder='Search for products...'
        />

        <div className='flex gap-3'>
          <Link
            to='/cart'
            className='hover:scale-125 transition-transform duration-300 ease-in-out'
          >
            <HiOutlineShoppingCart size={24} />
          </Link>
          <Link to='/login' className='hover:scale-125 transition-transform duration-300 ease-in-out'>
            <HiOutlineUserCircle size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
