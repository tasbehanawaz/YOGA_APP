import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import toast from 'react-hot-toast';

const VideoGenerator = () => {
  const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedPoses = [], videoUrl: stateVideoUrl } = state || {};
  const [poseDetails, setPoseDetails] = useState([]);
  const [expandedPoseIndex, setExpandedPoseIndex] = useState(null);
  const [videoAdded, setVideoAdded] = useState(false);
  const [videoHistory, setVideoHistory] = useState([]); // Track history of played videos

  // Fetch pose details based on selected poses
  const fetchPoseDetails = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/FetchYogaPoses.php`,
        { poses: selectedPoses }
      );
      setPoseDetails(response.data);
    } catch (error) {
      console.error('Error fetching pose details:', error);
    }
  }, [selectedPoses]);

  const handleGenerateVideo = useCallback(() => {
    if (videoAdded || stateVideoUrl) return; // Prevent generating the same video more than once in a session

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/generate_video.php`, {
        poses: selectedPoses,
        user_id: user.id,
        session_token: user.session_token,
        url_pngs: [],
      })
      .then((response) => {
        setLoading(false);
        if (response.data.videoPath) {
          setVideoUrl(response.data.videoPath);

          const newVideo = {
            videoPath: response.data.videoPath,
            selectedPoses,
            imageUrl: 'path_to_thumbnail', // Replace with actual logic to get the thumbnail URL
            type: selectedPoses.length > 0 ? 'selected' : 'random',
            generatedAt: new Date().toISOString(), // Add timestamp for generation
          };

          // Get existing videos from localStorage
          const existingVideos =
            JSON.parse(localStorage.getItem('generatedVideos')) || [];

          // Add the new video to the beginning of the array
          const updatedVideos = [newVideo, ...existingVideos];

          // Update localStorage and state with new video list
          localStorage.setItem(
            'generatedVideos',
            JSON.stringify(updatedVideos)
          );

          setVideoAdded(true); // Ensure this flag prevents re-generation in this session
        } else {
          console.error('Error generating video:', response.data.error);
          toast.error('Failed to generate video.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error generating video:', error);
        toast.error('Error generating video.');
      });
  }, [selectedPoses, user.id, user.session_token, videoAdded, stateVideoUrl]);

  useEffect(() => {
    if (selectedPoses.length > 0 && !videoAdded && !stateVideoUrl) {
      fetchPoseDetails();
      handleGenerateVideo();
    } else if (stateVideoUrl) {
      setVideoUrl(stateVideoUrl);
    }
  }, [selectedPoses, fetchPoseDetails, handleGenerateVideo, videoAdded, stateVideoUrl]);

  useEffect(() => {
    // Load video history from localStorage on component mount
    const existingHistory = JSON.parse(localStorage.getItem('playedVideos')) || [];
    setVideoHistory(existingHistory);
  }, []);

  const handleVideoPlay = (videoUrl) => {
    const newVideo = {
      videoPath: videoUrl,
      generatedAt: new Date().toISOString(),
      poseCount: selectedPoses.length, // Add the number of poses
    };

    // Update video history state and localStorage
    const updatedHistory = [newVideo, ...videoHistory];
    setVideoHistory(updatedHistory);
    localStorage.setItem('playedVideos', JSON.stringify(updatedHistory));
  };

  const saveVideoToProfile = () => {
    const newVideo = {
      videoPath: videoUrl,
      selectedPoses,
      imageUrl: 'path_to_thumbnail',
      type: selectedPoses.length > 0 ? 'selected' : 'random',
    };

    const existingVideos =
      JSON.parse(localStorage.getItem('profileVideos')) || [];
    existingVideos.unshift(newVideo);
    localStorage.setItem('profileVideos', JSON.stringify(existingVideos));
    toast.success('Video saved to your profile!');
  };

  const toggleDetails = (index) => {
    setExpandedPoseIndex(expandedPoseIndex === index ? null : index);
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  const handleSidebarVideoClick = (videoPath) => {
    setVideoUrl(videoPath); // Set the clicked video as the main video
    handleVideoPlay(videoPath); // Track that the video was played
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format date and time
  };

  return (
    <div className="generate-container flex flex-col items-center mt-24 relative">
      <div className="main-content flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Generated Video</h1>
        {loading ? (
          <p className="text-center">Generating...</p>
        ) : (
          videoUrl && (
            <div className="video-wrapper mb-8 flex flex-col items-center">
              <video
                className="video-content"
                src={videoUrl}
                controls
                onPlay={() => handleVideoPlay(videoUrl)} // Track video play
                onError={() => toast.error('Error loading video.')}
              />
              <button
                onClick={saveVideoToProfile}
                className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
              >
                Save Video To Profile
              </button>
            </div>
          )
        )}
        <div className="pose-details w-full max-w-3xl">
          <p className="instruction-text mb-4"></p>
          {poseDetails.map((pose, index) => (
            <div
              key={index}
              className="pose-detail mb-2 border border-gray-200 rounded"
            >
              <button
                className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={() => toggleDetails(index)}
              >
                <h2 className="pose-title text-xl font-semibold">
                  {pose.english_name}
                  <span className="float-right">
                    {expandedPoseIndex === index ? '▲' : '▼'}
                  </span>
                </h2>
              </button>
              {expandedPoseIndex === index && (
                <div className="pose-extra-details p-4 bg-white">
                  <p className="mb-2">
                    <strong>Description:</strong> {pose.pose_description}
                  </p>
                  <p>
                    <strong>Benefits:</strong> {pose.pose_benefits}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar for video preview */}
      {videoHistory.length > 0 && (
        <div className="video-sidebar absolute top-0 right-0 w-64 h-full bg-gray-100 p-4 border-l border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Video History</h2>
          <div className="scroll-indicator">
            <span className="arrow-up">▲</span>
          </div>
          {videoHistory.map((video, index) => (
            <div
              key={index}
              className="video-preview mb-4 cursor-pointer"
              onClick={() => handleSidebarVideoClick(video.videoPath)}
            >
              <video
                className="w-full"
                src={video.videoPath}
                controls
                onError={() => toast.error('Error loading video.')}
              />
              <p className="mt-2 text-sm">
                <strong>Generated At:</strong> {formatDate(video.generatedAt)}
              </p>
              <p className="text-sm">
                <strong>Number of Poses:</strong> {video.poseCount}
              </p>
            </div>
          ))}
          <div className="scroll-indicator">
            <span className="arrow-down">▼</span>
          </div>
          <button
            onClick={handleViewAllVideos}
            className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded w-full"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;


// import { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/useAuth';
// import toast from 'react-hot-toast';
// import './generate.css';

// const VideoGenerator = () => {
//   const { user } = useAuth();
//   const [videoUrl, setVideoUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { selectedPoses = [], videoUrl: stateVideoUrl, selectedVideo } = state || {};
//   const [poseDetails, setPoseDetails] = useState([]);
//   const [expandedPoseIndex, setExpandedPoseIndex] = useState(null);
//   const [videoAdded, setVideoAdded] = useState(false);
//   const [videoHistory, setVideoHistory] = useState([]);
//   const videoRef = useRef(null);
//   const scrollRef = useRef(null);

//   const fetchPoseDetails = useCallback(async (poses) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/FetchYogaPoses.php`,
//         { poses }
//       );
//       setPoseDetails(response.data || []);
//     } catch (error) {
//       console.error('Error fetching pose details:', error);
//       setPoseDetails([]);
//     }
//   }, []);

//   const handleGenerateVideo = useCallback(() => {
//     if (videoAdded || stateVideoUrl || selectedVideo) return;

//     setLoading(true);
//     axios
//       .post(`${import.meta.env.VITE_BACKEND_URL}/generate_video.php`, {
//         poses: selectedPoses,
//         user_id: user.id,
//         session_token: user.session_token,
//         url_pngs: [],
//       })
//       .then((response) => {
//         setLoading(false);
//         if (response.data.videoPath) {
//           setVideoUrl(response.data.videoPath);

//           const newVideo = {
//             videoPath: response.data.videoPath,
//             selectedPoses,
//             imageUrl: 'path_to_thumbnail',
//             type: selectedPoses.length > 0 ? 'selected' : 'random',
//             generatedAt: new Date().toISOString(),
//           };

//           const existingVideos =
//             JSON.parse(localStorage.getItem('generatedVideos')) || [];

//           const updatedVideos = [newVideo, ...existingVideos];

//           localStorage.setItem(
//             'generatedVideos',
//             JSON.stringify(updatedVideos)
//           );

//           setVideoAdded(true);
//         } else {
//           console.error('Error generating video:', response.data.error);
//           toast.error('Failed to generate video.');
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error('Error generating video:', error);
//         toast.error('Error generating video.');
//       });
//   }, [selectedPoses, user.id, user.session_token, videoAdded, stateVideoUrl, selectedVideo]);

//   useEffect(() => {
//     if (selectedVideo) {
//       setVideoUrl(selectedVideo.videoPath);
//       fetchPoseDetails(selectedVideo.selectedPoses);
//     } else if (selectedPoses.length > 0 && !videoAdded && !stateVideoUrl) {
//       fetchPoseDetails(selectedPoses);
//       handleGenerateVideo();
//     } else if (stateVideoUrl) {
//       setVideoUrl(stateVideoUrl);
//     }
//   }, [selectedPoses, fetchPoseDetails, handleGenerateVideo, videoAdded, stateVideoUrl, selectedVideo]);

//   useEffect(() => {
//     const existingHistory = JSON.parse(localStorage.getItem('playedVideos')) || [];
//     setVideoHistory(existingHistory);
//   }, []);

//   const handleVideoPlay = (video) => {
//     const selectedPoses = video.selectedPoses || [];

//     setVideoUrl(video.videoPath);
//     fetchPoseDetails(selectedPoses);

//     const newVideo = {
//       videoPath: video.videoPath,
//       generatedAt: new Date().toISOString(),
//       poseCount: selectedPoses.length,
//     };

//     const updatedHistory = [newVideo, ...videoHistory];
//     setVideoHistory(updatedHistory);
//     localStorage.setItem('playedVideos', JSON.stringify(updatedHistory));
//   };

//   const saveVideoToProfile = () => {
//     const newVideo = {
//       videoPath: videoUrl,
//       selectedPoses,
//       imageUrl: 'path_to_thumbnail',
//       type: selectedPoses.length > 0 ? 'selected' : 'random',
//     };

//     const existingVideos =
//       JSON.parse(localStorage.getItem('profileVideos')) || [];
//     existingVideos.unshift(newVideo);
//     localStorage.setItem('profileVideos', JSON.stringify(existingVideos));
//     toast.success('Video saved to your profile!');
//   };

//   const toggleDetails = (index) => {
//     setExpandedPoseIndex(expandedPoseIndex === index ? null : index);
//   };

//   const handleViewAllVideos = () => {
//     navigate('/all-generated-videos');
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const handleVideoClick = () => {
//     if (videoRef.current) {
//       videoRef.current.play();
//     }
//   };

//   return (
//     <div className="generate-container flex flex-col items-center mt-24 relative">
//       <div className="main-content flex-1 flex flex-col items-center">
//         <h1 className="text-3xl font-bold mb-4 text-center">Generated Video</h1>
//         {loading ? (
//           <p className="text-center">Generating...</p>
//         ) : (
//           videoUrl && (
//             <div className="video-wrapper mb-8 flex flex-col items-center">
//               <video
//                 className="video-content"
//                 src={videoUrl}
//                 ref={videoRef}
//                 onClick={handleVideoClick}
//                 controls
//                 onError={() => toast.error('Error loading video.')}
//               />
//               <button
//                 onClick={saveVideoToProfile}
//                 className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded"
//               >
//                 Save Video To Profile
//               </button>
//             </div>
//           )
//         )}
//         <div className="pose-details w-full max-w-3xl">
//           <p className="instruction-text mb-4"></p>
//           {Array.isArray(poseDetails) && poseDetails.length > 0 ? (
//             poseDetails.map((pose, index) => (
//               <div
//                 key={index}
//                 className="pose-detail mb-2 border border-gray-200 rounded"
//               >
//                 <button
//                   className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
//                   onClick={() => toggleDetails(index)}
//                 >
//                   <h2 className="pose-title text-xl font-semibold">
//                     {pose.english_name}
//                     <span className="float-right">
//                       {expandedPoseIndex === index ? '▲' : '▼'}
//                     </span>
//                   </h2>
//                 </button>
//                 {expandedPoseIndex === index && (
//                   <div className="pose-extra-details p-4 bg-white">
//                     <p className="mb-2">
//                       <strong>Description:</strong> {pose.pose_description}
//                     </p>
//                     <p>
//                       <strong>Benefits:</strong> {pose.pose_benefits}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No pose details available.</p>
//           )}
//         </div>
//       </div>
//       {videoHistory.length > 0 && (
//         <div className="video-sidebar absolute top-0 right-0 w-full max-w-md bg-gray-100 p-4 border-l border-gray-300 overflow-y-auto">
//           <h2 className="text-xl font-bold mb-4">Video History</h2>
//           <div className="video-history-container flex flex-col space-y-4">
//             {videoHistory.map((video, index) => (
//               <div
//                 key={index}
//                 className="video-preview"
//                 onClick={() => handleVideoPlay(video)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <video
//                   className="w-full"
//                   src={video.videoPath}
//                   controls
//                   onError={() => toast.error('Error loading video.')}
//                 />
//                 <p className="mt-2 text-sm">
//                   <strong>Generated At:</strong> {formatDate(video.generatedAt)}
//                 </p>
//                 <p>
//                   <strong>Poses Selected:</strong> {video.poseCount || selectedPoses.length}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={handleViewAllVideos}
//             className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded w-full"
//           >
//             View All
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoGenerator;
