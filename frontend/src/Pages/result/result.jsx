import { useLocation } from 'react-router-dom';
import { CardDefault } from '../../components/card/card';

const Result = () => {
  const location = useLocation();
  let pose = location.state.data; // This is the state passed during navigation

  // TODO: This needs to be fixed
  // Find the index of the first '{' character
  const jsonStartIndex = pose.indexOf('{');

  // Slice the string from that index
  pose = JSON.parse(pose.slice(jsonStartIndex));

  console.log(pose, 'pose');

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl text-gray-700 mb-5">Here is your Pose</h1>
      <CardDefault
        name={pose.english_name}
        imageUrl={pose.url_png}
        poseDescription={pose.pose_benefits}
        className="w-72"
      />
    </div>
  );
};

export default Result;
