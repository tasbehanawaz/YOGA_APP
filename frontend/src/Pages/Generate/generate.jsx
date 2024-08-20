import { useState, useEffect, useCallback } from 'react';
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

  const fetchPoseDetails = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/FetchYogaPoses.php`,
        { poses: selectedPoses }
      );
      setPoseDetails(response.data);
    } catch (error) {
      console.error('Error fetching pose details:', error);
    }
  }, [selectedPoses]);

  const handleGenerateVideo = useCallback(() => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/generate_video.php`, {
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
  }, [selectedPoses, user.id, user.session_token]);

  useEffect(() => {
    if (selectedPoses.length > 0) {
      fetchPoseDetails();
      handleGenerateVideo();
    }
    fetchGeneratedVideos(); // Fetch generated videos from localStorage
  }, [selectedPoses, fetchPoseDetails, handleGenerateVideo]);

  const fetchGeneratedVideos = () => {
    const storedGeneratedVideos =
      JSON.parse(localStorage.getItem('generatedVideos')) || [];
    setGeneratedVideos(storedGeneratedVideos);
  };

  const saveVideoToProfile = () => {
    // Save the video to the profile page (by updating localStorage)
    const newVideo = {
      videoPath: videoUrl,
      selectedPoses,
      imageUrl: 'path_to_thumbnail', // Replace with actual logic to get the thumbnail URL
      type: selectedPoses.length > 0 ? 'selected' : 'random',
    };

    const existingVideos =
      JSON.parse(localStorage.getItem('profileVideos')) || [];
    existingVideos.unshift(newVideo); // Add the new video to the beginning
    localStorage.setItem('profileVideos', JSON.stringify(existingVideos));
    alert('Video saved to your profile!');
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
                onClick={saveVideoToProfile}
                className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
              >
                Save Video To Profile
              </button>
            </div>
          )
        )}
        <div className="pose-details w-full max-w-3xl">
          <p className="instruction-text mb-4">
            Click on the yoga pose name to see more details.
          </p>
          {poseDetails.map((pose, index) => (
            <div
              key={index}
              className="pose-detail mb-2 border border-gray-200 rounded"
            >
              <button
                className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleDetails(index)}
              >
                <h2 className="pose-title text-xl font-semibold">
                  {pose.english_name}
                  <span className="float-right">
                    {expandedPoseIndex === index ? '▲' : '▼'}
                  </span>
                </h2>
              </button>
              {expandedPoseIndex === index && (
                <div className="pose-extra-details p-4 bg-white">
                  <p className="mb-2">
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
            <video
              src={video.videoPath}
              alt={`Video ${index + 1}`}
              className="generated-video-preview"
              onClick={() => setVideoUrl(video.videoPath)}
              style={{ cursor: 'pointer' }}
              controls
              muted
              width="100%"
            />
            <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
          </div>
        ))}
        <div className="view-all-container">
          <button
            className="button view-all-button"
            onClick={handleViewAllVideos}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
