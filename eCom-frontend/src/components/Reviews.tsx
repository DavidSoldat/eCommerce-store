import Review from './Review';

export default function Reviews() {
  return (
    <div className='py-10 flex flex-col gap-4 max-w-[1024px] mx-auto'>
      <h2 className='uppercase text-3xl font-extrabold font-[IntegralCF]'>
        our happy customers
      </h2>
      <div className='flex overflow-x-auto space-x-4 scrollbar-hide hideScroll'>
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
