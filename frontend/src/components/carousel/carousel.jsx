import { Carousel } from '@material-tailwind/react';
import yogaPose from '../../assets/carl-barcelo-nqUHQkuVj3c-unsplash.jpg';
import yogaPose1 from '../../assets/oksana-taran-xB4ExGcUai0-unsplash.jpg';
import yogaPose2 from '../../assets/zen-bear-yoga-IVf7hm88zxY-unsplash.jpg';

export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl">
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
    </Carousel>
  );
}
