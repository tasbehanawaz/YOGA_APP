import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]); // State for saved poses
  const [profileVideos, setProfileVideos] = useState([]); // State for saved videos
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
          axios.get(`http://localhost:8001/get_saved_poses.php?user_id=${user.id}`) // Ensure this API is correct
     ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data); // Store the fetched saved poses
        fetchProfileVideos(); // Fetch saved videos from localStorage
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
  }, [user, navigate]); // Keep 'user' and 'navigate' dependencies here for the navigation to work properly.

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
    navigate('/generate', { state: { selectedPoses }, replace: true });
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
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
    <div key={user.id} className="profile-container">
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

        {savedPoses.length === 0 ? (  // Conditionally render based on saved poses
          <p>No saved poses available.</p>
        ) : (
          savedPoses.map((pose, index) => (
            <div key={index} className="pose-item" onClick={() => handleReadMore(pose.name)}>
              <img 
                src={pose.image_url || 'https://via.placeholder.com/150'} 
                alt={pose.name} 
                className="pose-image" 
              />
              <p>{pose.name}</p>
            </div>
          ))
        )}
        <button className="button" onClick={handleViewAllPoses}>View All</button>

      </div>
      <div className="profile-videos">
        <h2 className="section-title">Your Saved Videos</h2>
        <div className="profile-videos-grid">
          {profileVideos.slice(0, 4).map((video, index) => (
            <div key={index} className="profile-video-item mb-4">
              <video
                src={video.videoPath}
                alt={`Video ${index + 1}`}
                className="profile-video-preview"
                onClick={() => handleWatchVideo(video.selectedPoses)}
                style={{ cursor: 'pointer' }}
                controls
                muted
                width="100%"
              />
              <p>
                {video.type === 'random' ? 'Random Video' : 'Selected Video'}
              </p>
            </div>
          ))}
        </div>
        {profileVideos.length > 4 && (
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

export default Profile;
