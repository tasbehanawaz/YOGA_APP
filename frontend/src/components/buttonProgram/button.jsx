import { Button } from '@material-tailwind/react';

export function ButtonWithLink() {
  return (
    <div className="flex items-center gap-4">
      <a href="#buttons-with-link">
        <Button>Join a Class</Button>
      </a>
      <a href="#buttons-with-link">
        <Button variant="gradient">Learn More</Button>
      </a>
    </div>
  );
}
