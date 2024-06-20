// src/components/buttonProgram/button.jsx
import { Button } from '@material-tailwind/react';

const ButtonComponent = () => {
  return (
    <div className="flex items-center gap-4">
      <Button>Join a class</Button>
      <a href="#learn-more">
        <Button variant="gradient">Learn More</Button>
      </a>
    </div>
  );
};

export default ButtonComponent;
