import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
// import './generate.css';

const VideoGenerator = () => {
  const {user} = useAuth();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoses]);

  const fetchPoseDetails = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8001/FetchYogaPoses.php',
        { poses: selectedPoses }
      );
      setPoseDetails(response.data);
    } catch (error) {
      console.error('Error fetching pose details:', error);
    }
  };

  const handleGenerateVideo = () => {
    setLoading(true);
    axios
      .post('http://localhost:8001/generate_video.php', {
        poses: selectedPoses,
        user_id: user.id,
        session_token: user.session_token,
        url_pngs: [],
        // durations: selectedPoses.map(() => 90)
      })
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

  const handleDownload = (videoUrl) => {
    const fileUrl = videoUrl;

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = fileUrl;
    a.setAttribute('download', videoUrl);
    document.body.appendChild(a);
    a.click();
    document.body.remove(a);
  };

  const saveVideoToDatabase = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8001/save_video.php',
        {
          video_path: videoUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        alert('Video saved successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving the video:', error);
      alert('Error saving video.');
    }
  };

  return (
    <div className="generate-container flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Generated Video</h1>
      {loading ? (
        <p className="text-center">Generating...</p>
      ) : (
        videoUrl && (
          <div className="video-wrapper mb-8 flex flex-col items-center">
            <video
              className="video-content"
              src={videoUrl}
              controls
              onError={() => alert('Error loading video.')}
            />
            <button
              onClick={saveVideoToDatabase}
              className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
            >
              Save Video To Profile
            </button>
            <button
              onClick={() => {
                handleDownload(videoUrl);
              }}
              className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
            >
              Download Video
            </button>
          </div>
        )
      )}
      <div className="pose-details w-full max-w-3xl">
        {poseDetails.map((pose, index) => (
          <div key={index} className="pose-detail mb-4">
            <h2 className="pose-title text-xl font-semibold">
              {pose.english_name}
            </h2>
            <p>
              <strong>Description:</strong> {pose.pose_description}
            </p>
            <p>
              <strong>Benefits:</strong> {pose.pose_benefits}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGenerator;
