import { useLocation } from 'react-router-dom';
import { CardDefault } from '../../components/card/card';
import PropTypes from 'prop-types'; // Add PropTypes for prop validation
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios library

const Result = () => {
  const location = useLocation();
  const pose = location.state?.data; // Expect pose to be an object already

  const navigate = useNavigate();

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

  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  const handleSavePose = async (pose) => {
    console.log('Saving pose:', pose); // Debugging line
    try {
      const response = await axios.post(
        'http://localhost:8001/save_pose.php',
        {
          english_name: pose.english_name,
          pose_description: pose.pose_description,
          url_png: pose.url_png,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        alert('Pose saved successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving the pose:', error);
      alert('Error saving pose.');
    }
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl text-gray-700 mb-5">Here is your Pose</h1>
      <CardDefault
        name={english_name}
        imageUrl={url_png}
        poseDescription={pose_benefits}
        onSave={() => handleSavePose(pose)}
        buttonOnClick={() => handleReadMore(pose.english_name)}
        className="w-72"
        showFooter={true}
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
