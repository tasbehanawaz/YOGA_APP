import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import axios from 'axios';
import { Carousel, IconButton } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const SavedPoses = () => {
    const [savedPoses, setSavedPoses] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);
    const itemsPerPage = 4; // Number of items to display per page

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedPoses = async () => {
            try {
                const response = await axios.get('http://localhost:8001/get_saved_poses.php');
                const nonFavorites = response.data.filter(pose => !pose.isFavorite);
                setSavedPoses(nonFavorites);
                fetchSavedVideos();
            } catch (error) {
                console.error('Error fetching saved poses:', error);
            }
        };

        const fetchSavedVideos = () => {
            const storedProfileVideos = JSON.parse(localStorage.getItem('profileVideos')) || [];
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
            const response = await axios.post('http://localhost:8001/reset_saved_poses.php');
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

    return (
        <div className="saved-poses-container">
            <h1>Favorites</h1>

            {/* Saved Videos Section with Smaller Carousel */}
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
                            className="!absolute top-2/4 left-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
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
                            className="!absolute top-2/4 right-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
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
                    {savedVideos.map((video, index) => (
                        <div key={index} className="media-item">
                            <video 
                                src={video.videoPath} 
                                alt={`Video ${index + 1}`} 
                                className="media-preview"
                                onClick={() => handleWatchVideo(video.selectedPoses)}
                                controls
                                muted
                                width="100%"
                            />
                            <p>{video.type === 'random' ? 'Random Video' : 'Selected Video'}</p>
                        </div>
                    ))}
                </Carousel>
            )}

            {/* Saved Poses Section with Smaller Carousel */}
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
                            className="!absolute top-2/4 left-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
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
                            className="!absolute top-2/4 right-2 -translate-y-2/4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
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
                    {savedPoses.map((pose) => (
                        <div key={pose.id} className="media-item">
                            <CardDefault
                                name={pose.name}
                                imageUrl={pose.image_url || 'https://via.placeholder.com/150'}
                                poseDescription={pose.description}
                                onClick={() => handleReadMore(pose.name)}
                            />
                        </div>
                    ))}
                </Carousel>
            )}

            <button onClick={handleClearPoses} className="clear-button">Clear Saved Items</button>

            <style jsx>{`
                .saved-poses-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem;
                    background-color: #f0f4f8;
                    min-height: 100vh;
                }

                h1, h2 {
                    font-size: 2rem;
                    color: #1e2a38;
                    margin-bottom: 1.5rem;
                }

                .media-item {
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 1rem;
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
                    padding: 0.6rem 1.2rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s ease;
                }

                .clear-button:hover {
                    background-color: #0056b3;
                }

                .pagination {
                    margin-top: 1rem;
                    font-size: 1.2rem;
                    color: #333;
                }

                @media (max-width: 768px) {
                    h1, h2 {
                        font-size: 1.5rem;
                    }

                    .clear-button {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default SavedPoses;
