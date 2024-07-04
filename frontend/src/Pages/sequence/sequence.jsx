// Sequence.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';

const Sequence = () => {
  const [poses, setPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPoses();
  }, []);

  const fetchAllPoses = async () => {
    try {
      const response = await axios.get('http://localhost:8001/FetchAllYogaPoses.php');
      setPoses(response.data);
    } catch (error) {
      console.error('Error fetching the poses:', error);
    }
  };

  const handlePoseSelect = (pose) => {
    setSelectedPoses((prev) => {
      if (prev.includes(pose)) {
        return prev.filter((p) => p !== pose);
      } else {
        return [...prev, pose];
      }
    });
  };

  const handleGenerateVideo = () => {
    if (selectedPoses.length > 0) {
      navigate('/generate', { state: { selectedPoses } });
    } else {
      alert('Please select at least two pose.');
    }
  };

  const handleSavePose = async (pose) => {
    try {
      const response = await axios.post('http://localhost:8001/save_pose.php', {
        english_name: pose.english_name,
        pose_description: pose.pose_description,
        url_png: pose.url_png
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
    <div className="sequence-container m-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Select Yoga Poses</h1>
      <div className="poses-grid">
        {poses.map((pose, index) => (
          <CardDefault
            key={index}
            name={pose.english_name}
            imageUrl={pose.url_png}
            poseDescription={pose.pose_benefits}
            onSave={() => handleSavePose(pose)}
            onClick={() => handlePoseSelect(pose.english_name)}
            isSelected={selectedPoses.includes(pose.english_name)}
          />
        ))}
      </div>
      <div className="sticky-button-container">
        <button
          className="bg-blue-900 transition-colors text-white py-2 px-4 rounded duration-500 hover:bg-blue-500"
          onClick={handleGenerateVideo}
        >
          Generate Video
        </button>
      </div>
      {/* {videoUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Generated Video:</h2>
          <video src={videoUrl} controls className="mt-4"></video>
        </div>
      )} */}
    </div>
  );
};

export default Sequence;