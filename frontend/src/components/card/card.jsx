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
  buttonOnClick,
  onSave,
  isSelected,
}) {
  return (
    <Card
      className={`mt-6 w-96 transform transition-transform duration-500 hover:scale-105 card-container ${
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
      <CardFooter className="pt-0 flex items-center">
        <Button
          className="transition-colors duration-500 hover:bg-blue-500 mr-4"
          onClick={buttonOnClick}
        >
          Read More
        </Button>
        <Button
          className="transition-colors duration-500 hover:bg-blue-500"
          onClick={onSave}
        >
          Save Pose
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
  buttonOnClick: PropTypes.func,
  onSave: PropTypes.func,
  isSelected: PropTypes.bool,
};

CardDefault.defaultProps = {
  // onClick: () => {},
  // onSave: () => {},
  isSelected: false,
};
