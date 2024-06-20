import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export function CardDefault({
  name,
  imageUrl,
  poseDescription,
  onClick,
  isSelected,
}) {
  return (
    <Card
      className={`mt-6 w-96  transform transition-transform duration-500 hover:scale-105 card-container ${
        isSelected ? 'selected' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-56 transition-height duration-500 hover:h-64"
      >
        <img
          src={imageUrl}
          alt="card-image"
          className="transition-opacity duration-500 hover:opacity-80"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>{poseDescription}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="transition-colors duration-500 hover:bg-blue-500">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}

CardDefault.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  poseDescription: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

CardDefault.defaultProps = {
  onClick: () => {},
  isSelected: false,
};
