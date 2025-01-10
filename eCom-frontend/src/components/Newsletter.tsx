export default function Newsletter() {
  return (
    <div className='bg-black rounded-20 px-6 py-8 flex flex-col gap-3 max-w-[1240px] mx-auto md:justify-between md:items-center md:flex-row md:px-11 mb-10'>
      <h2 className='uppercase text-3xl font-extrabold font-[IntegralCF] md:w-1/2 text-white mb-2'>
        stay up to date about our latest offers
      </h2>
      <div className='md:w-1/3 flex md:flex-col md:flex-nowrap gap-3 flex-wrap'>
        <input
          type='email'
          name='email'
          className='rounded-60 bg-white text-black py-3 text-sm font-medium w-full px-4'
          placeholder=' Enter your email address'
        />
        <button className='bg-white rounded-60 text-black w-full py-3 text-sm font-medium'>
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
}
