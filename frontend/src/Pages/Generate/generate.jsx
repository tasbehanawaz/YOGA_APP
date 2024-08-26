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
  const { selectedPoses, duration, url_png } = state || {
    selectedPoses: [],
    duration: null,
    url_png: [],
  };
  const [poseDetails, setPoseDetails] = useState([]);
  const [expandedPoseIndex, setExpandedPoseIndex] = useState(null);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [videoAdded, setVideoAdded] = useState(false);

  // Fetch pose details based on selected poses
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

  // Generate video based on selected poses
  const handleGenerateVideo = useCallback(async () => {
    if (videoAdded) {
      alert('Already generated this video');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate_video.php`,
        {
          poses: selectedPoses,
          user_id: user.id,
          session_token: user.session_token,
          url_pngs: url_png,
          duration,
        }
      );

      setLoading(false);
      if (response.data.videoPath) {
        const url = new URL(response.data.videoPath);
        const relativePath = url.pathname.substring(1);
        setVideoUrl(relativePath);

        const newVideo = {
          videoPath: relativePath,
          selectedPoses,
          imageUrl: 'path_to_thumbnail',
          type: selectedPoses.length > 0 ? 'selected' : 'random',
          generatedAt: new Date().toISOString(),
        };

        const existingVideos =
          JSON.parse(localStorage.getItem('generatedVideos')) || [];
        const updatedVideos = [newVideo, ...existingVideos];
        localStorage.setItem('generatedVideos', JSON.stringify(updatedVideos));
        setGeneratedVideos(updatedVideos);
        setVideoAdded(true);
      } else {
        console.error('Error generating video:', response.data.error);
        alert('Failed to generate video.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error generating video:', error.response || error.message);
      alert('Error generating video.');
    }
  }, [
    selectedPoses,
    user.id,
    user.session_token,
    videoAdded,
    duration,
    url_png,
  ]);

  // Fetch generated videos from localStorage and ensure no duplicates
  const fetchGeneratedVideos = useCallback(() => {
    const storedGeneratedVideos =
      JSON.parse(localStorage.getItem('generatedVideos')) || [];
    const uniqueVideos = Array.from(
      new Map(
        storedGeneratedVideos.map((video) => [video.videoPath, video])
      ).values()
    );
    setGeneratedVideos(uniqueVideos);
  }, []);

  useEffect(() => {
    if (selectedPoses.length > 0 && !videoAdded) {
      fetchPoseDetails();
      handleGenerateVideo();
    }
    fetchGeneratedVideos();
  }, [
    selectedPoses,
    videoAdded,
    fetchPoseDetails,
    fetchGeneratedVideos,
    handleGenerateVideo,
  ]);

  const saveVideoToProfile = () => {
    const newVideo = {
      videoPath: videoUrl,
      selectedPoses,
      imageUrl: 'path_to_thumbnail',
      type: selectedPoses.length > 0 ? 'selected' : 'random',
    };

    const existingVideos =
      JSON.parse(localStorage.getItem('profileVideos')) || [];
    existingVideos.unshift(newVideo);
    localStorage.setItem('profileVideos', JSON.stringify(existingVideos));
    alert('Video saved to your profile!');
  };

  const toggleDetails = (index) => {
    setExpandedPoseIndex(expandedPoseIndex === index ? null : index);
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="generate-container flex flex-col md:flex-row mt-24">
      <div className="main-content flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Generated Video</h1>
        {loading ? (
          <p className="text-center">Generating...</p>
        ) : (
          videoUrl && (
            <div className="video-wrapper mb-8 flex flex-col items-center">
              <video
                className="video-content"
                src={`http://localhost:8001/serve_video.php?path=${encodeURIComponent(
                  videoUrl
                )}`}
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
          <p className="instruction-text mb-4"></p>
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
        {generatedVideos.length > 0 ? (
          <div
            className="video-preview-bar mb-4"
            style={{ overflowY: 'scroll', maxHeight: '400px' }}
          >
            {generatedVideos.slice(0, 9).map((video, index) => (
              <div key={index} className="generated-video-item mb-4">
                <video
                  src={video.videoPath}
                  alt={`Generated Video ${index + 1}`}
                  className="generated-video-preview"
                  onClick={() => setVideoUrl(video.videoPath)}
                  style={{ cursor: 'pointer' }}
                  controls
                  muted
                  width="100%"
                />
                <p>
                  {video.type === 'random' ? 'Random Video' : 'Selected Video'}
                </p>
                <p>Generated on: {formatDate(video.generatedAt)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos generated yet.</p>
        )}
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
