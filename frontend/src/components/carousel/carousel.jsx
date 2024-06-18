import { Carousel } from '@material-tailwind/react';
import yogaPose from '../../assets/image1.jpg';
import yogaPose1 from '../../assets/image3.jpg';
import yogaPose2 from '../../assets/image4.jpg';
import yogaPose3 from '../../assets/image2.jpg';
import yogaPose4 from '../../assets/image5.jpg';

export function CarouselDefault() {
  return (
    <Carousel
      className="rounded-xl"
      autoplay={true}
      loop={true}
      autoplayDelay={3000}
    >
      <img
        src={yogaPose}
        alt="lady doing yoga pose"
        className="h-full w-full object-cover"
      />
      <img
        src={yogaPose2}
        alt="woman doing yoga"
        className="h-full w-full object-cover"
      />
      <img
        src={yogaPose1}
        alt="woman doing yoga"
        className="h-full w-full object-cover"
      />
      <img
        src={yogaPose3}
        alt="woman doing yoga"
        className="h-full w-full object-cover"
      />
      <img
        src={yogaPose4}
        alt="woman doing yoga"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
