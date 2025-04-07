import image2 from "../../assets/items/item.png";
import image1 from "../../assets/items/itemPage1.png";

export default function ImagesGallery({
  selectedImage,
  setSelectedImage,
  handleOpenModal,
}: {
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
  handleOpenModal: () => void;
}) {
  const images = [image1, image2, image1];

  function handleSelectImage(image: string) {
    setSelectedImage(image);
    handleOpenModal();
  }

  return (
    <div className="flex w-full flex-col items-center md:w-2/5">
      <div className="w-full">
        <img
          src={selectedImage || images[0]}
          alt="big image"
          className="h-[350px] w-full rounded-20 object-cover"
          onClick={() => handleSelectImage(selectedImage || images[0])}
        />
      </div>

      <div className="mt-4 flex w-full gap-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="h-[120px] w-1/3 cursor-pointer rounded-20 border object-cover hover:border-gray-800"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
