import ItemCard from './ItemCard';

export default function ItemsSection({ title }: { title: string }) {
  return (
    <div className='py-10 flex flex-col w-full md:max-w-[1024px] md:mx-auto gap-5 '>
      <h1 className='uppercase text-3xl font-extrabold text-center font-[IntegralCF]'>
        {title}
      </h1>

      <div className='md:flex md:flex-col md:items-center md:gap-5'>
        <div className='container md:w-full md:mx-0 mx-auto'>
          <div className='flex overflow-x-auto space-x-4 scrollbar-hide md:hidden'>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
          <div className='hidden md:flex md:flex-wrap justify-around '>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
        <button className='w-full text-sm py-3 border rounded-full md:w-fit md:px-10 justify-self-center '>
          View All
        </button>
      </div>
    </div>
  );
}
