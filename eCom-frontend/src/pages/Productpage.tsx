import { Box, Breadcrumbs, Divider, Rating, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import ImageGallery from '../components/ImageGallery';
import { discount } from '../utils/helpers';
import Review from '../components/Review';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ItemCard from '../components/ItemCard';

export default function Productpage() {
  const colors = [
    { id: 1, color: '#4F4631' },
    { id: 2, color: '#314F4A' },
    { id: 3, color: '#31344F' },
  ];
  const sizes = ['small', 'medium', 'large'];
  const product = {
    title: 'one life graphic t shirt',
    images: [],
    rating: 4.5,
    price: 300,
    quantity: 1,
    discount: 40,
    about:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  function handleDecrease() {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  }

  function handleIncrease() {
    setSelectedQuantity((prev) => prev + 1);
  }

  const [selectedColor, setSelectedColor] = useState<number>(colors[0].id);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    product.quantity
  );

  return (
    <div className='max-w-[1240px] mx-auto px-4'>
      <Divider />
      <div className='my-4'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link className='hover:underline' to={'/'}>
            Home
          </Link>
          <Link className='hover:underline' to={'/shop'}>
            Shop
          </Link>
          <Link className='hover:underline' to={'/shop/men'}>
            Men
          </Link>
          <Typography color='text.primary'>T-Shirts</Typography>
        </Breadcrumbs>
        <div className='my-5 flex flex-col gap-5'>
          <ImageGallery />

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <h2 className='uppercase font-[IntegralCF] text-2xl font-bold'>
                {product.title}
              </h2>
              <Box
                sx={{ '& > legend': { mt: 2 } }}
                className='flex items-center gap-3'
              >
                <Rating
                  name='read-only'
                  precision={0.5}
                  value={product.rating}
                  size='medium'
                  readOnly
                />
                <span className='text-base text-black opacity-60'>
                  {product.rating}/5
                </span>
              </Box>
              <div className='text-black text-2xl font-bold flex gap-3'>
                <p>${product.price}</p>
                <p className='opacity-30 line-through'>
                  ${discount(product.price, product.discount)}
                </p>
                <div className='bg-red-50 rounded-60 px-3 flex items-center'>
                  <span className='text-red-500 text-sm font-medium'>
                    -{product.discount}%
                  </span>
                </div>
              </div>
              <p className='text-black opacity-60'>{product.about}</p>
            </div>

            <Divider />

            <div className=' flex flex-col gap-3'>
              <h4 className='text-black opacity-60'>Choose Colors</h4>
              <div className='flex gap-x-3'>
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ring-1 ring-gray-300 ${
                      selectedColor === color.id ? 'ring-4 ring-gray-300' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color.id)}
                  >
                    {selectedColor === color.id && (
                      <span className='text-white font-bold'>&#10003;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className='flex flex-col gap-3'>
              <h4 className='text-black opacity-60'>Choose Size</h4>
              <div className='flex flex-wrap gap-x-3'>
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`bg-[#f0f0f0] px-5 py-3 rounded-60 capitalize ${
                      selectedSize === size ? 'text-white bg-black' : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className='flex gap-3'>
              <div className='bg-[#f0f0f0] px-3 py-2 rounded-60 capitalize text-lg'>
                <button
                  className='px-3 text-xl font-bold'
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className='px-3'>{selectedQuantity}</span>
                <button
                  className='px-3 text-xl font-bold'
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <div className='bg-black text-white px-5 py-3 rounded-60 capitalize flex-grow text-center'>
                Add to Cart
              </div>
            </div>

            <Divider />

            <div className='flex flex-col gap-3'>
              <h4 className='text-black opacity-60'>Rating & Reviews</h4>
              <Review />
              <Review />
              <Review />
              <Review />
            </div>

            <h2
              className='text-3xl font-bold font-[IntegralCF]
            mx-5 text-center mt-10'
            >
              you might also like
            </h2>
            <div className='flex flex-col gap-2'>
              <div className='flex self-end'>
                <button onClick={scrollLeft} className='px-2 py-2 rounded-md '>
                  <FaArrowLeft size={22} />
                </button>
                <button onClick={scrollRight} className='px-2 py-2 rounded-md '>
                  <FaArrowRight size={22} />
                </button>
              </div>
              <div
                ref={containerRef}
                className='flex overflow-x-auto space-x-4 scrollbar-hide hideScroll'
              >
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
