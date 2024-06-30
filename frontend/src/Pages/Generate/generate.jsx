import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import './generate.css';

const VideoGenerator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { selectedPoses } = state || { selectedPoses: [] };
  const [poseDetails, setPoseDetails] = useState([]);

  useEffect(() => {
    if (selectedPoses.length > 0) {
      fetchPoseDetails();
      handleGenerateVideo();
    }
  }, [selectedPoses]);

  const fetchPoseDetails = async () => {
    try {
      const response = await axios.post('http://localhost:8001/FetchYogaPoses.php', { poses: selectedPoses });
      setPoseDetails(response.data);
    } catch (error) {
      console.error('Error fetching pose details:', error);
    }
  };

  const handleGenerateVideo = () => {
    setLoading(true);
    axios.post('http://localhost:8001/generate_video.php', { poses: selectedPoses })
      .then((response) => {
        setLoading(false);
        console.log(response.data); // Log the response
        if (response.data.videoPath) {
          setVideoUrl(response.data.videoPath);
        } else {
          console.error('Error generating video:', response.data.error);
          alert('Failed to generate video.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error generating video:', error);
        alert('Error generating video.');
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Generated Video</h1>
      {loading ? (
        <p>Generating...</p>
      ) : (
        videoUrl && (
          <div className="flex justify-center mb-8">
            <video className="w-full max-w-md" src={videoUrl} controls onError={() => alert('Error loading video.')} />
          </div>
        )
      )}
      <div className="pose-details mt-8">
        {poseDetails.map((pose, index) => (
          <div key={index} className="pose-detail mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{pose.english_name}</h2>
            <p className="mb-2"><strong>Description:</strong> {pose.pose_description}</p>
            <p><strong>Benefits:</strong> {pose.pose_benefits}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGenerator;
