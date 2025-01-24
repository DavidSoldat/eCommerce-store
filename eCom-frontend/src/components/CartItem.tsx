import { useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function CartItem({
  image,
  title,
  size,
  color,
  price,
  quantity,
}: {
  image: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}) {

  function handleDecrease() {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  }

  function handleIncrease() {
    setSelectedQuantity((prev) => prev + 1);
  }

  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    quantity,
  );

  return (
    <div className='flex md:justify-between gap-x-4 '>
      <div className='w-24 h-24 md:w-32 md:h-32 aspect-square overflow-hidden rounded-lg '>
        <img
          src={image}
          alt='item image'
          className='w-24 h-24 md:w-32 md:h-32 object-cover'
        />
      </div>
      <div className='flex-grow md:w-full flex flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <h3 className='text-base font-bold'>{title}</h3>
            <button>
              <RiDeleteBin5Fill size={20} color='#ff3333' />
            </button>
          </div>
          <p className='text-xs'>
            Size: <span className='text-black opacity-70'>{size}</span>
          </p>
          <p className='text-xs'>
            Color: <span className='text-black opacity-70'>{color}</span>
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-bold'>${price}</p>
          <div className='bg-[#f0f0f0] rounded-60 py-1'>
            <button className='px-3' onClick={handleDecrease}>-</button>
            <span className='px-3'>{selectedQuantity}</span>
            <button className='px-3' onClick={handleIncrease}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
