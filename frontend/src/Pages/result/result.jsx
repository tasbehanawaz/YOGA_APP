import { useLocation } from 'react-router-dom';
import { CardDefault } from '../../components/card/card';
import PropTypes from 'prop-types'; // Add PropTypes for prop validation

const Result = () => {
  const location = useLocation();
  const pose = location.state?.data; // Expect pose to be an object already

  // Check if pose is an object and not null
  if (typeof pose !== 'object' || pose === null) {
    console.error('Expected pose to be an object, but got:', typeof pose);
    return <div>Invalid data passed to component</div>;
  }

  // Check if all required properties are present
  const { english_name, url_png, pose_benefits } = pose;
  if (!english_name || !url_png || !pose_benefits) {
    console.error('Pose data is missing required properties:', pose);
    return <div>Incomplete pose data</div>;
  }

  console.log(pose, 'pose');

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl text-gray-700 mb-5">Here is your Pose</h1>
      <CardDefault
        name={english_name}
        imageUrl={url_png}
        poseDescription={pose_benefits}
        className="w-72"
      />
    </div>
  );
};

// Prop validation for CardDefault
CardDefault.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  poseDescription: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Result;
