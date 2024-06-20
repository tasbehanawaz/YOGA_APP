// src/components/buttonWithLink/ButtonWithLink.jsx
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function ButtonWithLink() {
  const navigate = useNavigate();

  const handleGenerateSequenceClick = () => {
    navigate('/sequence');
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleGenerateSequenceClick}>Generate a sequence</Button>
      <a href="#buttons-with-link">
        <Button variant="gradient">Learn More</Button>
      </a>
    </div>
  );
}

export default ButtonWithLink;
