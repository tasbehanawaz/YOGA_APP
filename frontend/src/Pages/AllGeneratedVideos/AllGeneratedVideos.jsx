import { useState, useEffect } from 'react';
import './AllGeneratedVideos.css';
import { useNavigate } from 'react-router-dom';

const AllGeneratedVideos = () => {
  const navigate = useNavigate();
  const [generatedVideos, setGeneratedVideos] = useState([]);

  useEffect(() => {
    const storedGeneratedVideos = JSON.parse(localStorage.getItem('generatedVideos')) || [];
    setGeneratedVideos(storedGeneratedVideos);
  }, []);

  const handleWatchVideo = (selectedPoses) => {
    navigate('/generate', { state: { selectedPoses } });
  };

  const handleClearVideos = () => {
    localStorage.removeItem('generatedVideos'); // Remove videos from localStorage
    setGeneratedVideos([]); // Clear the state
  };

  return (
    <div className="all-generated-videos-container">
      <h2 className="section-title">All Recently Generated Videos</h2>
      <div className="generated-videos-grid">
        {generatedVideos.length > 0 ? (
          generatedVideos.map((video, index) => (
            <div key={index} className="generated-video-item mb-4">
              <video
                src={video.videoPath}
                alt={`Video ${index + 1}`}
                className="generated-video-preview"
                onClick={() => handleWatchVideo(video.selectedPoses)}
                style={{ cursor: 'pointer' }}
                controls
                muted
                width="100%"
              />
              <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
            </div>
          ))
        ) : (
          <p>No videos generated yet.</p>
        )}
      </div>
      <div className="buttons-container">
        <button className="button" onClick={handleClearVideos}>
          Clear Videos
        </button>
        <button className="button" onClick={() => navigate('/profile')}>
          Profile
        </button>
        {/* New Back to Generate button */}
        <button className="button" onClick={() => navigate('/generate')}>
          Back to Generate
        </button>
      </div>
    </div>
  );
};

export default AllGeneratedVideos;
