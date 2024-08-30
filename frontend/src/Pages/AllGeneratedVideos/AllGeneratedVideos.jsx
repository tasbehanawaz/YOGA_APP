import { useState, useEffect } from 'react';
import './AllGeneratedVideos.css';
import { useNavigate } from 'react-router-dom';
import './AllGeneratedVideos.css';

const AllGeneratedVideos = () => {
  const navigate = useNavigate();
  const [playedVideos, setPlayedVideos] = useState([]);

  useEffect(() => {
    // Retrieve played videos from localStorage
    const storedPlayedVideos = JSON.parse(localStorage.getItem('playedVideos')) || [];
    setPlayedVideos(storedPlayedVideos);
  }, []);

  const handleWatchVideo = (video) => {
    // Navigate to the video generator page with the selected video details
    navigate('/generate', { state: { selectedVideo: video } });
  };

  const handleClearVideos = () => {
    localStorage.removeItem('playedVideos'); // Remove played videos from localStorage
    setPlayedVideos([]); // Clear the state
  };

  return (
    <div className="all-generated-videos-container">
      <h2 className="section-title">All Played Videos</h2>
      <div className="generated-videos-grid">
        {playedVideos.length > 0 ? (
          playedVideos.map((video, index) => (
            <div key={index} className="generated-video-item mb-4">
              <video
                src={video.videoPath}
                alt={`Video ${index + 1}`}
                className="generated-video-preview"
                onClick={() => handleWatchVideo(video)} // Pass the entire video object
                style={{ cursor: 'pointer' }}
                controls
                muted
                width="100%"
              />
              <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
              <p>{new Date(video.generatedAt).toLocaleString()}</p> {/* Display the generation time */}
              <p>{video.poseCount} poses</p> {/* Display the number of poses */}
            </div>
          ))
        ) : (
          <p>No videos played yet.</p>
        )}
      </div>
      <div className="buttons-container">
        <button className="button" onClick={handleClearVideos}>
          Clear Videos
        </button>
        <button className="button" onClick={() => navigate('/profile')}>
          Profile
        </button>
        <button className="button" onClick={() => navigate('/generate')}>
          Back to Generate
        </button>
      </div>
    </div>
  );
};

export default AllGeneratedVideos;
