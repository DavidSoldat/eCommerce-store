import ItemCard from './ItemCard';

export default function ItemsSection({ title }: { title: string }) {
  return (
    <div className='py-10 flex flex-col w-full gap-5 '>
      <h1 className='uppercase text-3xl font-extrabold text-center font-[IntegralCF]'>
        {title}
      </h1>

      <div className='container mx-auto'>
        <div className='flex overflow-x-auto space-x-4 scrollbar-hide'>
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
      <button className='w-full text-sm py-3 border rounded-full'>
        View All
      </button>
    </div>
  );
}
