import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavedPoses = () => {
  const [savedPoses, setSavedPoses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPoses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get_saved_poses.php`
        );
        console.log('Fetched Poses: ', response.data); // Debugging line
        setSavedPoses(response.data); // Assuming the array is directly in data
      } catch (error) {
        console.error('Error fetching saved poses:', error);
      }
    };

    fetchSavedPoses();
  }, []);

  // Function to handle the "Read More" button click
  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  // Function to handle resetting saved poses
  const handleResetPoses = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reset_saved_poses.php`
      );
      if (response.data.success) {
        setSavedPoses([]); // Clear the saved poses in the front-end state
        console.log(response.data.message);
      } else {
        console.error('Failed to reset saved poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error resetting saved poses:', error);
    }
  };

  if (savedPoses.length === 0) {
    return (
      <div className="saved-poses-container">
        <div className="no-poses-message">No saved poses available.</div>
        <button onClick={handleResetPoses} className="reset-button">
          Reset Saved Poses
        </button>

        <style jsx>{`
          .saved-poses-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background-color: #f5f5f5;
            min-height: 100vh;
          }
          .reset-button {
            margin-bottom: 1rem;
            background-color: #e53e3e;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .reset-button:hover {
            background-color: #c53030;
          }
          .no-poses-message {
            font-size: 1.25rem;
            color: #333;
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="saved-poses-container">
      <button onClick={handleResetPoses} className="reset-button">
        Reset Saved Poses
      </button>
      <div className="poses-grid">
        {savedPoses.map((pose) => (
          <CardDefault
            key={pose.id}
            name={pose.name}
            imageUrl={pose.image_url || 'https://via.placeholder.com/150'} // Placeholder if image_url is not available
            poseDescription={pose.description}
            onClick={() => console.log(`Clicked on ${pose.name}`)}
            onSave={() => console.log(`Saved ${pose.name}`)}
            isSelected={false}
            buttonOnClick={() => handleReadMore(pose.name)} // Add Read More button functionality
          />
        ))}
      </div>
      <style jsx>{`
        .saved-poses-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #f5f5f5;
          min-height: 100vh;
        }
        .reset-button {
          margin-bottom: 1rem;
          background-color: #e53e3e;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .reset-button:hover {
          background-color: #c53030;
        }
        .poses-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
        }
        .no-poses-message {
          font-size: 1.25rem;
          color: #333;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SavedPoses;
