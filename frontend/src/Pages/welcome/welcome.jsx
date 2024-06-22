// src/Pages/welcome/welcome.jsx
import { useNavigate } from 'react-router-dom';
import Register from '../login/logins'; // Correct default import
import './welcome.css'; // Optional: Import CSS for styling if needed

const Welcome = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/'); // Redirect to the home page after successful authentication
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1 className="welcome-title">Welcome to Yoga App</h1>
        <p className="welcome-subtitle">Register or navigate to other pages.</p>
      </header>
      <div className="welcome-register">
        <Register onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}

export default Welcome;
