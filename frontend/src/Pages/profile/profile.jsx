
import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [generatedVideos, setGeneratedVideos] = useState([]); // State for multiple generated videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/SignIn');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userResponse, posesResponse] = await Promise.all([
          axios.get(`http://localhost:8001/get_user.php?user_id=${user.id}`),
          axios.get(
            `http://localhost:8001/get_saved_poses.php?user_id=${user.id}`
          ),
        ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data.slice(0, 3));
        fetchPreviousVideos();
        fetchGeneratedVideos(); // Fetch generated videos from localStorage
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPreviousVideos = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8001/fetch_previous_videos.php',
          { user_id: user.id }
        );
        console.log('Fetched previous videos:', response.data);
        setPreviousVideos(response.data);
      } catch (error) {
        console.error('Error fetching previous videos:', error);
      }
    };

    const fetchGeneratedVideos = () => {
      const storedGeneratedVideos = JSON.parse(localStorage.getItem('generatedVideos')) || [];
      setGeneratedVideos(storedGeneratedVideos);
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {
        await logout();
        navigate('/SignIn');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleViewAllPoses = () => {
    navigate('/save');
  };

  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  const handleDownload = (videoUrl) => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.setAttribute('download', videoUrl.split('/').pop());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleWatchVideo = (selectedPoses) => {
    navigate('/generate', { state: { selectedPoses } });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2>User Details</h2>
        <p>User ID: {user.id}</p>
        <p>Username: {user.username}</p>
        <p>Session Token: {user.session_token}</p>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="saved-poses">
        <h2>Saved Poses</h2>
        {savedPoses.map((pose, index) => (
          <div
            key={index}
            className="pose-item"
            onClick={() => handleReadMore(pose.name)}
          >
            <img
              src={pose.image_url || 'https://via.placeholder.com/150'}
              alt={pose.name}
              className="pose-image"
            />
            <p>{pose.name}</p>
          </div>
        ))}
        <button className="button" onClick={handleViewAllPoses}>
          View All
        </button>
      </div>
      <div className="previous-videos">
        <h2 className="text-2xl font-bold mb-4">Previously Generated Videos</h2>
        {previousVideos.length > 0 ? (
          previousVideos.map((video, index) => (
            <div key={index} className="previous-video mb-4">
              <video
                className="previous-video-content"
                src={video.videoPath}
                controls
                onError={() => alert('Error loading video.')}
              />
              <button
                onClick={() => handleDownload(video.videoPath)}
                className="mt-2 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <p>No previously generated videos found.</p>
        )}
      </div>
      <div className="generated-videos">
        <h2 className="section-title">Recently Generated Videos</h2>
        <div className="generated-videos-grid">
          {generatedVideos.length > 0 ? (
            generatedVideos.map((video, index) => (
              <div key={index} className="generated-video-item mb-4">
                <img 
                  src={video.imageUrl} 
                  alt={`Video ${index + 1}`} 
                  className="generated-video-image"
                  onClick={() => handleWatchVideo(video.selectedPoses)}
                  style={{ cursor: 'pointer' }}
                />
                <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
              </div>
            ))
          ) : (
            <p>No videos generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
