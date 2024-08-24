import { Carousel } from '@material-tailwind/react';
import yogaPose from '../../assets/image1.jpg';
import yogaPose1 from '../../assets/image3.jpg';
import yogaPose2 from '../../assets/image4.jpg';
import yogaPose3 from '../../assets/image2.jpg';
import yogaPose4 from '../../assets/image5.jpg';

export function CarouselDefault() {
  const images = [
    { src: yogaPose, alt: 'lady doing yoga pose' },
    { src: yogaPose2, alt: 'woman doing yoga' },
    { src: yogaPose1, alt: 'woman doing yoga' },
    { src: yogaPose3, alt: 'woman doing yoga' },
    { src: yogaPose4, alt: 'woman doing yoga' },
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto">
      <Carousel
        className="rounded-xl"
        autoplay={true}
        loop={true}
        autoplayDelay={3000}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="h-[600px] w-full overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
