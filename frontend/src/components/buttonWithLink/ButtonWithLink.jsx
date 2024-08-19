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
    </div>
  );
}

export default ButtonWithLink;
