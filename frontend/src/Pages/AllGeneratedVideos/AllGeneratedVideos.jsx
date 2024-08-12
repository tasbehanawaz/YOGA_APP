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

  return (
    <div className="all-generated-videos-container">
      <h2 className="section-title">All Recently Generated Videos</h2>
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
      <button className="button" onClick={() => navigate('/profile')}>
        Back to Profile
      </button>
    </div>
  );
};

export default AllGeneratedVideos;

