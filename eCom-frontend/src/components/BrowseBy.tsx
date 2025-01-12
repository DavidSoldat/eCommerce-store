import FilterCard from './FilterCard';
import casual from '../assets/filterImages/casual.png';
import formal from '../assets/filterImages/formal.png';
import party from '../assets/filterImages/party.png';
import gym from '../assets/filterImages/gym.png';

export default function BrowseBy() {
  return (
    <div className='bg-[#f0f0f0] rounded-20 px-6 py-8 max-w-[1240px] md:mx-auto'>
      <h2 className='uppercase text-3xl font-extrabold text-center font-[IntegralCF]'>
        Browse by <br /> dress style
      </h2>
      <div className='flex flex-col gap-4 mt-6 md:grid md:grid-cols-2 md:grid-rows-2'>
        <FilterCard title='casual' image={casual} />
        <FilterCard title='formal' image={formal} />
        <FilterCard title='party' image={party} />
        <FilterCard title='gym' image={gym} />
      </div>
    </div>
  );
}
