import { useState } from 'react';

import image1 from '../assets/items/itemPage1.png';
import image2 from '../assets/items/item.png';

export default function ImagesGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = [image1, image2, image1];

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='w-full '>
        <div className='w-full'>
          <img
            src={selectedImage || images[0]}
            alt='big image'
            className='rounded-20 object-cover w-full aspect-square'
            onClick={() => setSelectedImage(images[0])}
          />
        </div>

        <div className='flex gap-3 mt-4'>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className='w-full aspect-square rounded-20 cursor-pointer border hover:border-gray-800'
              style={{
                width: `calc((100% - 2 * 0.75rem) / 3)`,
              }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
