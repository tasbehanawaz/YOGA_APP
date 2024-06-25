// src/Pages/Program/program.jsx
import { CarouselDefault } from '../../components/carousel/carousel';
import { Typography } from '@material-tailwind/react';
import ButtonWithLink from '../../components/buttonWithLink/ButtonWithLink'; // Correct import path with case sensitivity





const Program = () => {
  return (
    <>
      <div className="box mt-8">
        <Typography variant="h4">Find Your Inner Peace</Typography>
        <div className="mt-8">
          <CarouselDefault />
        </div>
        <div className="mt-8">
          <ButtonWithLink />
        </div>
      </div>
      <div className="about">
        <Typography variant="h3">About Us</Typography>
        <Typography variant="paragraph">
          Located in the heart of Canterbury, Yoga App is your ultimate
          destination for holistic well-being. Yoga App offers a variety of yoga
          classes, meditation sessions, wellness workshops, and much more. From
          invigorating Vinyasa flows to relaxing Yin yoga, beginner-friendly
          sessions to advanced practices, and mindfulness meditations to
          holistic wellness tips – Immerse yourself in the Yoga App lifestyle!
          Our virtual classes are available around the clock, allowing you to
          practice yoga anytime, anywhere. Mornings are perfect for starting
          your day with energy and clarity, while evenings offer a chance to
          unwind and relax. Classes are filling up fast due to popular demand –
          Book your sessions in advance to ensure your spot. We can’t wait to
          embark on this journey of wellness and transformation with you!
        </Typography>
      </div>
    </>
  );
};

export default Program;
