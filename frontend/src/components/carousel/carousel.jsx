import { Carousel } from '@material-tailwind/react';
import yogaPose from '../../assets/dane-wetton-t1NEMSm1rgI-unsplash.jpg';
import yogaPose1 from '../../assets/madison-lavern-4gcqRf3-f2I-unsplash.jpg';
import yogaPose2 from '../../assets/oksana-taran-xB4ExGcUai0-unsplash.jpg';

export function CarouselDefault() {
  return (
    <Carousel className="rounded-xl flex items-center justify-center">
      <img
        src={yogaPose2}
        alt="woman doing yoga"
        className="h-full w-1/2 object-cover"
      />
      <img
        src={yogaPose1}
        alt="woman doing yoga"
        className="h-full w-1/2 object-cover"
      />
      <img
        src={yogaPose}
        alt="lady doing yoga pose"
        className="h-full w-1/2 object-cover"
      />
    </Carousel>
  );
}
