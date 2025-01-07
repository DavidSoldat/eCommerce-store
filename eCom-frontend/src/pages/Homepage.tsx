import { Divider } from '@mui/material';
import Hero from '../components/Hero';
import ItemsSection from '../components/ItemSection';
import BrowseBy from '../components/BrowseBy';

export default function Homepage() {
  return (
    <div>
      <Hero />
      <div className='px-4'>
        <ItemsSection title={'new arrivals'} />
        <Divider />
        <ItemsSection title={'top selling'} />
        <BrowseBy />
      </div>
    </div>
  );
}
