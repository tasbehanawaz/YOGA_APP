// src/Pages/sequence/Sequence.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import './sequence.css';

const Sequence = () => {
  const [poses, setPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  // Call fetchAllPoses when the component mounts or is created initially
  useEffect(() => {
    fetchAllPoses();
  }, []);

  const fetchAllPoses = async () => {
    try {
      const response = await axios.get('http://localhost:8001/FetchAllYogaPoses.php');
      console.log('response.data', response.data);
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
    axios.post('http://localhost:8001/generate_video.php', { poses: selectedPoses })
      .then((response) => {
        if (response.data.videoPath) {
          setVideoUrl(response.data.videoPath);
        } else {
          console.error('Error generating video:', response.data.error);
        }
      })
      .catch((error) => {
        console.error('Error generating video:', error);
      });
  };

  return (
    <div className="sequence-container m-8">
      <h1 className="text-2xl font-bold mb-4">Select Yoga Poses</h1>
      <div className="poses-grid">
        {poses.map((pose, index) => (
          <CardDefault
            key={index}
            name={pose.english_name}
            imageUrl={pose.url_png}
            poseDescription={pose.pose_benefits}
            onClick={() => handlePoseSelect(pose.english_name)}
            isSelected={selectedPoses.includes(pose.english_name)}
          />
        ))}
      </div>
      <button
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleGenerateVideo}
      >
        Generate Video
      </button>
      {videoUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Generated Video:</h2>
          <video src={videoUrl} controls className="mt-4"></video>
        </div>
      )}
    </div>
  );
};

export default Sequence;