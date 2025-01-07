import heroImg from '../assets/hero.png';
import calivnKlein from '../assets/brandLogos/calvinKlein.png';
import gucci from '../assets/brandLogos/gucci.png';
import prada from '../assets/brandLogos/prada.png';
import zara from '../assets/brandLogos/zara.png';
import versace from '../assets/brandLogos/versace.png';

export default function Hero() {
  return (
    <div className='bg-[#F2F0F1] pt-7 '>
      <div className='px-4 flex flex-col gap-5'>
        <h1 className='uppercase font-extrabold text-4xl leading-8 font-[IntegralCF]'>
          find clother that matches your style
        </h1>
        <p className='text-sm text-black opacity-60'>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button className='text-base text-white bg-black w-full rounded-60 py-4'>
          Shop Now
        </button>

        <div className='container mx-auto grid grid-cols-2 gap-y-6 gap-x-6 md:grid-cols-3 text-center'>
          <div className='relative '>
            <h2 className='text-2xl font-extrabold text-black'>200+</h2>
            <p className='font-normal text-xs text-black opacity-60'>
              International Brands
            </p>
            <div className='hidden md:block absolute top-0 right-0 h-full border-r border-gray-300'></div>
          </div>
          <div className='relative'>
            <h2 className='text-2xl font-extrabold text-black'>2,000+</h2>
            <p className='font-normal text-xs text-black opacity-60'>
              High-Quality Products
            </p>
            <div className='hidden md:block absolute top-0 right-0 h-full border-r border-gray-300'></div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <h2 className='text-2xl font-extrabold text-black'>30,000+</h2>
            <p className='font-normal text-xs text-black opacity-60'>
              Happy Customers
            </p>
          </div>
        </div>
      </div>

      <div className='w-full bg-cover'>
        <img
          src={heroImg}
          alt='hero image'
          className='w-full h-auto object-cover'
        />
      </div>

      <div className='parent md:flex md:justify-between px-4 py-10 bg-black'>
        <div className='div1 flex justify-center'>
          <img src={versace} alt='Versace logo' />
        </div>
        <div className='div2 flex justify-center'>
          <img src={zara} alt='Zara logo' />
        </div>
        <div className='div3 flex justify-center'>
          <img src={gucci} alt='Gucci logo' />
        </div>
        <div className='div4 flex justify-center'>
          <img src={prada} alt='Prada logo' />
        </div>
        <div className='div5 flex justify-center'>
          <img src={calivnKlein} alt='Calivn Klein logo' />
        </div>
      </div>
    </div>
  );
}
