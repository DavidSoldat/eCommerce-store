import { Divider } from '@mui/material';
import BrowseBy from '../components/BrowseBy';
import Hero from '../components/Hero';
import ItemsSection from '../components/ItemSection';
import Newsletter from '../components/Newsletter';
import Reviews from '../components/Reviews';

export default function Homepage() {
  return (
    <div>
      <Hero />
      <div className='px-4'>
        <ItemsSection title={'new arrivals'} />
        <Divider />
        <ItemsSection title={'top selling'} />
        <BrowseBy />
        <Reviews />
        <Newsletter />
      </div>
    </div>
  );
}
