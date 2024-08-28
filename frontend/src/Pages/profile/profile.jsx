import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]); // State for saved poses
  const [profileVideos, setProfileVideos] = useState([]); // State for saved videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track the visible index for poses and videos
  const [poseIndex, setPoseIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const ITEMS_PER_PAGE = 4; // Show 4 items at a time

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
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/get_user.php?user_id=${
              user.id
            }`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/get_saved_poses.php?user_id=${
              user.id
            }`
          ),
        ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data);
        fetchProfileVideos();
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileVideos = () => {
      const storedProfileVideos =
        JSON.parse(localStorage.getItem('profileVideos')) || [];
      setProfileVideos(storedProfileVideos);
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

  // eslint-disable-next-line no-unused-vars
  const handleDownload = (videoUrl) => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.setAttribute('download', videoUrl.split('/').pop());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleWatchVideo = (selectedPoses) => {
    navigate('/generate', { state: { selectedPoses }, replace: true });
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  // Function to handle next and previous navigation
  const handleNext = (setIndex, items, index) => {
    if (index < items.length - ITEMS_PER_PAGE) {
      setIndex(index + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = (setIndex, index) => {
    if (index > 0) {
      setIndex(index - ITEMS_PER_PAGE);
    }
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
      <div className="section-container user-details">
        <h2>User Details</h2>
        <p>User ID: {user.id}</p>
        <p>Username: {user.username}</p>
        <p>Session Token: {user.session_token}</p>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Saved Poses Section */}
      <div className="section-container saved-poses">
        <h2>Saved Poses</h2>
        {savedPoses.length === 0 ? (
          <p>No saved poses available.</p>
        ) : (
          <div className="carousel">
            <button
              className="carousel-control prev"
              onClick={() => handlePrev(setPoseIndex, poseIndex)}
              disabled={poseIndex === 0}
            >
              &#8249;
            </button>
            <div className="carousel-items">
              {savedPoses
                .slice(poseIndex, poseIndex + ITEMS_PER_PAGE)
                .map((pose, index) => (
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
                    <p className="pose-name">{pose.name}</p>
                  </div>
                ))}
            </div>
            <button
              className="carousel-control next"
              onClick={() => handleNext(setPoseIndex, savedPoses, poseIndex)}
              disabled={poseIndex >= savedPoses.length - ITEMS_PER_PAGE}
            >
              &#8250;
            </button>
          </div>
        )}
        {savedPoses.length > ITEMS_PER_PAGE && (
          <button
            className="button view-all-button"
            onClick={handleViewAllPoses}
          >
            View All Favorites
          </button>
        )}
      </div>

      {/* Saved Videos Section */}
      <div className="section-container profile-videos">
        <h2>Your Saved Videos</h2>
        <div className="carousel">
          <button
            className="carousel-control prev"
            onClick={() => handlePrev(setVideoIndex, videoIndex)}
            disabled={videoIndex === 0}
          >
            &#8249;
          </button>
          <div className="carousel-items">
            {profileVideos
              .slice(videoIndex, videoIndex + ITEMS_PER_PAGE)
              .map((video, index) => (
                <div key={index} className="profile-video-item mb-4">
                  <video
                    src={video.videoPath}
                    alt={`Video ${index + 1}`}
                    className="profile-video-preview"
                    onClick={() => handleWatchVideo(video.selectedPoses)}
                    controls
                    muted
                  />
                  <p>
                    {video.type === 'random'
                      ? 'Random Video'
                      : 'Selected Video'}
                  </p>
                </div>
              ))}
          </div>
          <button
            className="carousel-control next"
            onClick={() => handleNext(setVideoIndex, profileVideos, videoIndex)}
            disabled={videoIndex >= profileVideos.length - ITEMS_PER_PAGE}
          >
            &#8250;
          </button>
        </div>
        {profileVideos.length > ITEMS_PER_PAGE && (
          <button
            className="button view-all-button"
            onClick={handleViewAllVideos}
          >
            View All Videos
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
