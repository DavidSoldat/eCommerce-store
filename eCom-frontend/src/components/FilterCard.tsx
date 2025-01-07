export default function FilterCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className='rounded-20 bg-cover relative'>
      <h2 className='absolute top-4 left-6 text-2xl capitalize font-bold'>
        {title}
      </h2>
      <img
        src={image}
        alt={title}
        className='w-full rounded-20 h-auto object-cover'
      />
    </div>
  );
}
