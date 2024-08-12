import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const VideoGenerator = () => {
  const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedPoses } = state || { selectedPoses: [] };
  const [poseDetails, setPoseDetails] = useState([]);
  const [expandedPoseIndex, setExpandedPoseIndex] = useState(null);
  const [generatedVideos, setGeneratedVideos] = useState([]);

  useEffect(() => {
    if (selectedPoses.length > 0) {
      fetchPoseDetails();
      handleGenerateVideo();
    }
    fetchGeneratedVideos(); // Fetch generated videos from localStorage
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
      })
      .then((response) => {
        setLoading(false);
        if (response.data.videoPath) {
          setVideoUrl(response.data.videoPath);

          // Save the generated video details to localStorage
          const newVideo = {
            videoPath: response.data.videoPath,
            selectedPoses,
            imageUrl: 'path_to_thumbnail', // Replace with actual logic to get the thumbnail URL
            type: selectedPoses.length > 0 ? 'selected' : 'random',
          };

          const existingVideos =
            JSON.parse(localStorage.getItem('generatedVideos')) || [];
          existingVideos.unshift(newVideo); // Add the new video to the beginning
          localStorage.setItem(
            'generatedVideos',
            JSON.stringify(existingVideos)
          );
          setGeneratedVideos(existingVideos);
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

  const fetchGeneratedVideos = () => {
    const storedGeneratedVideos =
      JSON.parse(localStorage.getItem('generatedVideos')) || [];
    setGeneratedVideos(storedGeneratedVideos);
  };

  const handleDownload = (videoUrl) => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.setAttribute('download', videoUrl.split('/').pop());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const saveVideoToDatabase = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8001/save_video.php',
        {
          user_id: user.id,
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

  const toggleDetails = (index) => {
    setExpandedPoseIndex(expandedPoseIndex === index ? null : index);
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  return (
    <div className="generate-container flex flex-col md:flex-row">
      <div className="main-content flex-1 flex flex-col items-center">
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
                onClick={() => handleDownload(videoUrl)}
                className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
              >
                Download Video
              </button>
            </div>
          )
        )}
        <div className="pose-details w-full max-w-3xl">
          <p className="instruction-text">
            Click on the yoga pose name to see more details.
          </p>
          {poseDetails.map((pose, index) => (
            <div
              key={index}
              className={`pose-detail ${
                expandedPoseIndex === index ? 'expanded' : ''
              }`}
            >
              <h2
                className="pose-title text-xl font-semibold cursor-pointer"
                onClick={() => toggleDetails(index)}
              >
                {pose.english_name}
              </h2>
              {expandedPoseIndex === index && (
                <div className="pose-extra-details">
                  <p>
                    <strong>Description:</strong> {pose.pose_description}
                  </p>
                  <p>
                    <strong>Benefits:</strong> {pose.pose_benefits}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar w-full md:w-1/4 flex flex-col items-center md:items-start md:pl-4">
        <h2 className="text-2xl font-bold mb-4">Recently Generated Videos</h2>
        {generatedVideos.slice(0, 4).map((video, index) => (
          <div key={index} className="generated-video-item mb-4">
            <img
              src={video.imageUrl}
              alt={`Video ${index + 1}`}
              className="generated-video-image"
              onClick={() => setVideoUrl(video.videoPath)}
              style={{ cursor: 'pointer' }}
            />
            <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
          </div>
        ))}
        {generatedVideos.length > 4 && (
          <div className="view-all-container">
            <button
              className="button view-all-button"
              onClick={handleViewAllVideos}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;
