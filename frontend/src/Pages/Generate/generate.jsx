import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import toast from 'react-hot-toast';

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

  const handleGenerateVideo = useCallback(() => {
    if (videoAdded) return; // Prevent generating the same video more than once in a session

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

          const newVideo = {
            videoPath: response.data.videoPath,
            selectedPoses,
            imageUrl: 'path_to_thumbnail', // Replace with actual logic to get the thumbnail URL
            type: selectedPoses.length > 0 ? 'selected' : 'random',
            generatedAt: new Date().toISOString(), // Add timestamp for generation
          };

          // Get existing videos from localStorage
          const existingVideos =
            JSON.parse(localStorage.getItem('generatedVideos')) || [];

          // Add the new video to the beginning of the array
          const updatedVideos = [newVideo, ...existingVideos];

          // Update localStorage and state with new video list
          localStorage.setItem(
            'generatedVideos',
            JSON.stringify(updatedVideos)
          );
          setGeneratedVideos(updatedVideos);
          setVideoAdded(true); // Ensure this flag prevents re-generation in this session
        } else {
          console.error('Error generating video:', response.data.error);
          toast.error('Failed to generate video.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error generating video:', error);
        toast.error('Error generating video.');
      });
  }, [selectedPoses, user.id, user.session_token, videoAdded]);

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
    fetchPoseDetails,
    handleGenerateVideo,
    fetchGeneratedVideos,
    videoAdded,
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
    toast.success('Video saved to your profile!');
  };

  const toggleDetails = (index) => {
    setExpandedPoseIndex(expandedPoseIndex === index ? null : index);
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format date and time
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
                src={videoUrl}
                controls
                onError={() => toast.error('Error loading video.')}
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

      {/* Preview Bar with vertical scrollable videos */}
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
