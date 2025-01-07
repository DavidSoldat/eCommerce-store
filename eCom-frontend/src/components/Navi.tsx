import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
} from 'react-icons/hi';

export default function Navi() {
  return (
    <div className='px-4 py-5 flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <HiOutlineMenu size={22} />
        <h1 className='text-2xl uppercase font-medium '>Velura.Co</h1>
      </div>
      <div className='flex justify-end gap-3'>
        <HiOutlineSearch size={22} />
        <HiOutlineShoppingCart size={22} />
        <HiOutlineUserCircle size={22} />
      </div>
    </div>
  );
}
