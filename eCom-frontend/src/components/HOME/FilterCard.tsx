export default function FilterCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className='rounded-20 bg-cover relative cursor-pointer group'>
      <h2 className='absolute top-4 left-6 text-2xl capitalize font-bold text-black z-10 transform transition-transform duration-300 group-hover:scale-110'>
        {title}
      </h2>
      <div className='aspect-w-5 aspect-h-2'>
        <img
          src={image}
          alt={title}
          className='w-full rounded-20 object-cover'
        />
      </div>
    </div>
  );
}
