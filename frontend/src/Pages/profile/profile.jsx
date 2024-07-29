
import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/SignIn');
      return;
    }

    const fetchData = async () => {
      try {
        const [userResponse, posesResponse] = await Promise.all([
          axios.get(`http://localhost:8001/get_user.php?user_id=${user.id}`),
          axios.get(`http://localhost:8001/get_saved_poses.php?user_id=${user.id}`)
        ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/SignIn');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error (e.g., show an error message to the user)
    }
  };

  const handleViewAllPoses = () => {
    navigate('/saved-poses');
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2>User Details</h2>
        <p>Name: {userDetails.username}</p>
        <p>Email: {userDetails.email}</p>
        <p>Membership Status: {userDetails.membershipStatus}</p>
        <button className="button" onClick={handleLogout} >Logout</button>
      </div>
      <div className="saved-poses">
        <h2>Saved Poses</h2>
        {savedPoses.map((pose, index) => (
          <div key={index} className="pose-item">
            <p>{pose.name}</p>
          </div>
        ))}
        <button className="button" onClick={handleViewAllPoses}>View All</button>
      </div>
    </div>
  );
};

export default Profile;