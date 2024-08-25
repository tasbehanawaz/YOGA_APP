import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import axios from 'axios';
import { Carousel, IconButton } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

// Helper function to chunk items into groups of two
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const SavedPoses = () => {
  const [savedPoses, setSavedPoses] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPoses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get_saved_poses.php`
        );
        const nonFavorites = response.data.filter((pose) => !pose.isFavorite);
        setSavedPoses(nonFavorites);
        fetchSavedVideos();
      } catch (error) {
        console.error('Error fetching saved poses:', error);
      }
    };

    const fetchSavedVideos = () => {
      const storedProfileVideos =
        JSON.parse(localStorage.getItem('profileVideos')) || [];
      setSavedVideos(storedProfileVideos);
    };

    fetchSavedPoses();
  }, []);

  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  const handleWatchVideo = (selectedPoses) => {
    navigate('/generate', { state: { selectedPoses }, replace: true });
  };

  const handleClearPoses = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reset_saved_poses.php`
      );
      if (response.data.success) {
        setSavedPoses([]);
        setSavedVideos([]);
        console.log(response.data.message);
      } else {
        console.error('Failed to clear saved poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error clearing saved poses:', error);
    }
  };

  // Chunk the saved videos and poses into groups of two
  const chunkedVideos = chunkArray(savedVideos, 2);
  const chunkedPoses = chunkArray(savedPoses, 2);

  return (
    <div className="saved-poses-container">
      <h1>Favorites</h1>

      {/* Distinctive Container for Saved Videos Section */}
      <div className="section-container">
        <h2>Saved Videos</h2>
        {savedVideos.length === 0 ? (
          <div className="no-poses-message">No saved videos available.</div>
        ) : (
          <Carousel
            className="rounded-xl max-w-screen-lg mx-auto"
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="carousel-control !absolute top-2/4 left-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="carousel-control !absolute top-2/4 right-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {chunkedVideos.map((videoGroup, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-2"
              >
                {videoGroup.map((video, index) => (
                  <div key={index} className="media-item w-1/2 p-1">
                    <video
                      src={video.videoPath}
                      alt={`Video ${index + 1}`}
                      className="media-preview"
                      onClick={() => handleWatchVideo(video.selectedPoses)}
                      controls
                      muted
                      width="100%"
                      height="150"
                    />
                    <p className="text-xs mt-1">
                      {video.type === 'random'
                        ? 'Random Video'
                        : 'Selected Video'}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* Distinctive Container for Saved Poses Section */}
      <div className="section-container">
        <h2>Saved Poses</h2>
        {savedPoses.length === 0 ? (
          <div className="no-poses-message">No saved poses available.</div>
        ) : (
          <Carousel
            className="rounded-xl max-w-screen-lg mx-auto"
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="carousel-control !absolute top-2/4 left-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="carousel-control !absolute top-2/4 right-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {chunkedPoses.map((poseGroup, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-2"
              >
                {poseGroup.map((pose) => (
                  <div key={pose.id} className="media-item w-1/2 p-1">
                    <CardDefault
                      name={pose.name}
                      imageUrl={
                        pose.image_url || 'https://via.placeholder.com/100'
                      }
                      poseDescription={pose.description}
                      onClick={() => handleReadMore(pose.name)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <button onClick={handleClearPoses} className="clear-button">
        Clear Saved Items
      </button>

      <style jsx>{`
        .saved-poses-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #f0f4f8;
          min-height: 100vh;
        }

        h1,
        h2 {
          font-size: 1.5rem;
          color: #1e2a38;
          margin-bottom: 1rem;
        }

        .section-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #007bff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          width: 100%;
          max-width: 900px;
        }

        .media-item {
          background-color: #fff;
          border-radius: 8px;
          padding: 0.5rem;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .media-item:hover {
          transform: translateY(-3px);
        }

        .media-preview {
          width: 100%;
          height: auto;
          cursor: pointer;
        }

        .clear-button {
          margin-top: 2rem;
          background-color: #007bff;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
        }

        .clear-button:hover {
          background-color: #0056b3;
        }

        /* Arrow Customization */
        .carousel-control {
          background-color: rgba(0, 123, 255, 0.7);
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
        }

        .carousel-control:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          h1,
          h2 {
            font-size: 1.2rem;
          }

          .media-item {
            width: 50%;
          }
        }

        @media (max-width: 480px) {
          .media-item {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SavedPoses;
