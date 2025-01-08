import Review from './Review';

// export default function Reviews() {
//   return (
//     <div className='py-10 flex flex-col gap-4 max-w-[1024px] mx-auto'>
//       <h2 className='uppercase text-3xl font-extrabold font-[IntegralCF]'>
//         our happy customers
//       </h2>
//       <div className='flex overflow-x-auto space-x-4 scrollbar-hide hideScroll'>
//         <Review />
//         <Review />
//         <Review />
//         <Review />
//         <Review />
//         <Review />
//         <Review />
//       </div>
//     </div>
//   );
// }

import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='py-10 flex flex-col gap-4 max-w-[1024px] mx-auto'>
      <div className='flex justify-between items-center'>
        <h2 className='uppercase text-3xl font-extrabold font-[IntegralCF]'>
          our happy customers
        </h2>

        <div className='flex '>
          <button onClick={scrollLeft} className='px-2 py-2 rounded-md '>
            <FaArrowLeft size={22} />
          </button>
          <button onClick={scrollRight} className='px-2 py-2 rounded-md '>
            <FaArrowRight size={22} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className='flex overflow-x-auto space-x-4 scrollbar-hide hideScroll'
      >
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
}
