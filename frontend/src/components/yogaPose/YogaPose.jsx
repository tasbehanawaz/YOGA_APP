import { useState } from 'react';
import axios from 'axios';

const YogaPose = () => {
  const [poseName, setPoseName] = useState('');
  const [poseData, setPoseData] = useState(null);
  const [newPose, setNewPose] = useState({ name: '', description: '' });

  const fetchPose = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/backend/FetchYogaPoses.php?poseName=${poseName}`
      );
      setPoseData(response.data);
    } catch (error) {
      console.error('Error fetching the pose:', error);
    }
  };

  const savePose = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/backend/save_yoga_pose.php`,
        newPose
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error saving the pose:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={poseName}
          onChange={(e) => setPoseName(e.target.value)}
          placeholder="Enter pose name"
        />
        <button onClick={fetchPose}>Fetch Pose</button>
        {poseData && (
          <div>
            <h2>{poseData.english_name}</h2>
            {poseData.url_png && (
              <img src={poseData.url_png} alt={poseData.english_name} />
            )}
            <p>{poseData.pose_description}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Save New Pose</h3>
        <input
          type="text"
          value={newPose.name}
          onChange={(e) => setNewPose({ ...newPose, name: e.target.value })}
          placeholder="Enter new pose name"
        />
        <input
          type="text"
          value={newPose.description}
          onChange={(e) =>
            setNewPose({ ...newPose, description: e.target.value })
          }
          placeholder="Enter new pose description"
        />
        <button onClick={savePose}>Save Pose</button>
      </div>
    </div>
  );
};

export default YogaPose;
