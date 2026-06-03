import Footer from '@/components/footer/footer';
import Header from '@/components/navbar/navbar';
import Image from 'next/image';

const images = [
  '/images/gallery/image1.jpg',
  '/images/gallery/image2.jpg',
  '/images/gallery/image3.jpg',
  '/images/gallery/image4.jpg',
  '/images/gallery/image5.jpg',
  '/images/gallery/image6.jpg',
];

export default function Gallery() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8 pt-30">
      <h2 className="text-3xl font-[Btitr] text-center mb-8">گالری تصاویر</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={500} // اندازه دلخواه
              height={400} // اندازه دلخواه
              className="w-full h-full object-cover transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
