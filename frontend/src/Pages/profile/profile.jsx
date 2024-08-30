import { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [savedPoses, setSavedPoses] = useState([]);
  const [profileVideos, setProfileVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [poseIndex, setPoseIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const [poseSearchQuery, setPoseSearchQuery] = useState('');

  // State for video session logging
  const [videoSessionHistory, setVideoSessionHistory] = useState(
    JSON.parse(localStorage.getItem('videoSessionHistory')) || []
  );

  const [attemptedPosesToday, setAttemptedPosesToday] = useState(0);
  const [completedSessionsToday, setCompletedSessionsToday] = useState(0);
  const [completedPosesToday, setCompletedPosesToday] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

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
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_user.php?user_id=${user.id}`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_saved_poses.php?user_id=${user.id}`),
        ]);

        setUserDetails(userResponse.data);
        setSavedPoses(posesResponse.data);
        fetchProfileVideos();
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

    // Initialize today's stats
    updateTodayStats(videoSessionHistory);
  }, [user, navigate]);

  useEffect(() => {
    if (location.state?.sessionDetails) {
      const newSession = {
        ...location.state.sessionDetails,
        completedAt: new Date().toLocaleString(),
      };
      const updatedHistory = [newSession, ...videoSessionHistory];
      setVideoSessionHistory(updatedHistory);
      localStorage.setItem('videoSessionHistory', JSON.stringify(updatedHistory));

      // Update today's stats based on the new session
      updateTodayStats(updatedHistory);
    }
  }, [location.state]);

  const updateTodayStats = (sessionHistory) => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setCurrentDate(today);
      setAttemptedPosesToday(0);
      setCompletedSessionsToday(0);
      setCompletedPosesToday([]);
    } else {
      const todaySessions = sessionHistory.filter(
        session => new Date(session.completedAt).toDateString() === today
      );

      const posesAttemptedToday = todaySessions.reduce(
        (total, session) => total + session.attemptedPosesCount, 0
      );
      const posesCompletedToday = todaySessions.flatMap(session => session.completedPoses);

      setAttemptedPosesToday(posesAttemptedToday);
      setCompletedSessionsToday(todaySessions.length);
      setCompletedPosesToday(posesCompletedToday);
    }
  };

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

  const handleWatchVideo = (videoType) => {
    navigate('/generate', { replace: true });
  };

  const handleViewAllVideos = () => {
    navigate('/all-generated-videos');
  };

  const handleNext = (setIndex, items, index) => {
    if (index < items.length - ITEMS_PER_PAGE) {
      setIndex(index + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = (setIndex, index) => {
    if (index > 0) {
      setIndex(index - ITEMS_PER_PAGE);
    }
  };

  const filteredPoses = savedPoses.filter((pose) =>
    pose.name.toLowerCase().includes(poseSearchQuery.toLowerCase())
  );

  const totalPosePages = Math.ceil(filteredPoses.length / ITEMS_PER_PAGE);
  const totalVideoPages = Math.ceil(profileVideos.length / ITEMS_PER_PAGE);

  const handleStartNewSession = () => {
    navigate('/session');
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
    <div className="profile-container">
      <div className="section-container user-details">
        <h2>User Details</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="section-container yoga-streak">
        <h2>Your Yoga Streak</h2>
        <div className="tracker">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <button
              key={day}
              className={''}
            >
              {day}
            </button>
          ))}
        </div>
        <progress value={0} max="100" />
      </div>

      <div className="section-container">
        <input
          type="text"
          placeholder="Search saved poses..."
          value={poseSearchQuery}
          onChange={(e) => setPoseSearchQuery(e.target.value)}
        />
      </div>

      <div className="section-container saved-poses">
        <h2>Saved Poses</h2>
        {filteredPoses.length === 0 ? (
          <p>No saved poses available.</p>
        ) : (
          <>
            <div className="carousel">
              {filteredPoses
                .slice(poseIndex, poseIndex + ITEMS_PER_PAGE)
                .map((pose, index) => (
                  <div
                    key={index}
                    className="pose-item"
                    onClick={() => handleReadMore(pose.name)}
                  >
                    <img
                      src={pose.image_url || 'https://via.placeholder.com/150'}
                      alt={pose.name}
                      className="pose-image"
                    />
                    <p className="pose-name">{pose.name}</p>
                  </div>
                ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => handlePrev(setPoseIndex, poseIndex)}
                disabled={poseIndex === 0}
              >
                Previous
              </button>
              <span>
                Page {Math.floor(poseIndex / ITEMS_PER_PAGE) + 1} of{' '}
                {totalPosePages}
              </span>
              <button
                onClick={() =>
                  handleNext(setPoseIndex, filteredPoses, poseIndex)
                }
                disabled={poseIndex >= filteredPoses.length - ITEMS_PER_PAGE}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <div className="section-container profile-videos">
        <h2>Your Saved Videos</h2>
        {profileVideos.length === 0 ? (
          <p>No saved videos available.</p>
        ) : (
          <>
            <div className="carousel">
              {profileVideos
                .slice(videoIndex, videoIndex + ITEMS_PER_PAGE)
                .map((video, index) => (
                  <div key={index} className="profile-video-item mb-4">
                    <video
                      src={video.videoPath}
                      alt={`Video ${index + 1}`}
                      className="profile-video-preview"
                      onClick={() => handleWatchVideo(video.type)}
                      controls
                      muted
                    />
                    <p>
                      {video.type === 'random'
                        ? 'Random Video'
                        : 'Selected Video'}
                    </p>
                  </div>
                ))}
            </div>
            <div className="pagination">
              <button
                onClick={() => handlePrev(setVideoIndex, videoIndex)}
                disabled={videoIndex === 0}
              >
                Previous
              </button>
              <span>
                Page {Math.floor(videoIndex / ITEMS_PER_PAGE) + 1} of{' '}
                {totalVideoPages}
              </span>
              <button
                onClick={() =>
                  handleNext(setVideoIndex, profileVideos, videoIndex)
                }
                disabled={videoIndex >= profileVideos.length - ITEMS_PER_PAGE}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <div className="section-container video-stats">
        <h2>Your Yoga Practice</h2>
        <p>Poses Attempted Today: {attemptedPosesToday}</p>
        <p>Sessions Completed Today: {completedSessionsToday}</p>
        <p>Total Videos Watched: {videoSessionHistory.length}</p>
        <p>Total Time Spent: {videoSessionHistory.reduce((acc, session) => acc + session.duration, 0)} minutes</p>

        {completedPosesToday.length > 0 && (
          <div>
            <h3>Completed Poses Today:</h3>
            <div className="completed-poses-container">
              {completedPosesToday.map((pose, index) => (
                <div key={index} className="completed-pose-item">
                  <img src={pose.url_png} alt={pose.english_name} />
                  <div>
                    <h4>{pose.english_name}</h4>
                    <p>{pose.pose_description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="button" onClick={handleStartNewSession}>
          Start a New Session
        </button>
      </div>
    </div>
  );
};

export default Profile;


// import { useState, useEffect } from 'react';
// import './profile.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../contexts/useAuth';

// const Profile = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const { user, logout } = useAuth();
//   const [userDetails, setUserDetails] = useState({});
//   const [savedPoses, setSavedPoses] = useState([]);
//   const [profileVideos, setProfileVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [poseIndex, setPoseIndex] = useState(0);
//   const [videoIndex, setVideoIndex] = useState(0);
//   const ITEMS_PER_PAGE = 4;

//   // Search state for filtering poses
//   const [poseSearchQuery, setPoseSearchQuery] = useState('');

//   // State for video session logging
//   const [videoSessionHistory, setVideoSessionHistory] = useState(
//     JSON.parse(localStorage.getItem('videoSessionHistory')) || []
//   );

//   // State for yoga streak
//   const [yogaStreak, setYogaStreak] = useState([]);
//   const [weekStart, setWeekStart] = useState('');

//   // State for tracking poses attempted today
//   const [attemptedPosesToday, setAttemptedPosesToday] = useState(0);
//   const [currentDate, setCurrentDate] = useState(new Date().toDateString());

//   useEffect(() => {
//     if (!user) {
//       navigate('/SignIn');
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [userResponse, posesResponse] = await Promise.all([
//           axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/get_user.php?user_id=${user.id}`
//           ),
//           axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/get_saved_poses.php?user_id=${user.id}`
//           ),
//         ]);

//         setUserDetails(userResponse.data);
//         setSavedPoses(posesResponse.data);
//         fetchProfileVideos();
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchProfileVideos = () => {
//       const storedProfileVideos =
//         JSON.parse(localStorage.getItem('profileVideos')) || [];
//       setProfileVideos(storedProfileVideos);
//     };

//     fetchData();

//     // Initialize yoga streak and reset practice stats weekly
//     const storedStreak = JSON.parse(localStorage.getItem('yogaStreak')) || [];
//     const storedWeekStart = localStorage.getItem('weekStart');
//     const currentWeekStart = getCurrentWeekStart();

//     if (storedWeekStart !== currentWeekStart) {
//       setYogaStreak([]);
//       localStorage.removeItem('yogaStreak');
//       localStorage.setItem('weekStart', currentWeekStart);
//       resetWeeklyYogaPractice();
//     } else {
//       setYogaStreak(storedStreak);
//     }

//     setWeekStart(currentWeekStart);
//   }, [user, navigate]);

//   useEffect(() => {
//     const savedSessionHistory =
//       JSON.parse(localStorage.getItem('videoSessionHistory')) || [];

//     if (location.state?.sessionDetails) {
//       const newSession = {
//         ...location.state.sessionDetails,
//         completedAt: new Date().toLocaleString(),
//       };
//       const updatedHistory = [newSession, ...savedSessionHistory];
//       setVideoSessionHistory(updatedHistory);
//       localStorage.setItem(
//         'videoSessionHistory',
//         JSON.stringify(updatedHistory)
//       );

//       // Track poses attempted today
//       const today = new Date().toDateString();
//      setAttemptedPosesToday((currentCount) => {
//       if (today !== currentDate) {
//         setCurrentDate(today);
//         return newSession.attemptedPosesCount;
//       } else {
//         return currentCount + newSession.attemptedPosesCount;
//       }
//     });
//   } else {
//     setVideoSessionHistory(savedSessionHistory);
//   }
// }, [location.state, currentDate]);


//   const resetWeeklyYogaPractice = () => {
//     setVideoSessionHistory([]);
//     localStorage.removeItem('videoSessionHistory');
//     setAttemptedPosesToday(0);
//   };

//   // Get current week's start date
//   const getCurrentWeekStart = () => {
//     const now = new Date();
//     const firstDay = now.getDate() - now.getDay() + 1;
//     const monday = new Date(now.setDate(firstDay));
//     return monday.toDateString();
//   };

//   const handleLogout = async () => {
//     const confirmed = window.confirm('Are you sure you want to log out?');
//     if (confirmed) {
//       try {
//         await logout();
//         navigate('/SignIn');
//       } catch (error) {
//         console.error('Logout failed:', error);
//       }
//     }
//   };

//   // Handle yoga streak tracking
//   const handleTrackDay = (day) => {
//     const updatedStreak = [...yogaStreak, day];
//     setYogaStreak(updatedStreak);
//     localStorage.setItem('yogaStreak', JSON.stringify(updatedStreak));
//   };

//   const handleUntrackDay = (day) => {
//     const updatedStreak = yogaStreak.filter((d) => d !== day);
//     setYogaStreak(updatedStreak);
//     localStorage.setItem('yogaStreak', JSON.stringify(updatedStreak));
//   };

//   const streakProgress = (yogaStreak.length / 7) * 100;

//   const handleViewAllPoses = () => {
//     navigate('/save');
//   };

//   const handleReadMore = (poseName) => {
//     navigate(`/pose/${poseName}`);
//   };

//   const handleWatchVideo = (videoType) => {
//     logVideoSession(videoType, 30); // Assuming each video lasts 30 minutes
//     navigate('/generate', { replace: true });
//   };

//   const handleViewAllVideos = () => {
//     navigate('/all-generated-videos');
//   };

//   const handleNext = (setIndex, items, index) => {
//     if (index < items.length - ITEMS_PER_PAGE) {
//       setIndex(index + ITEMS_PER_PAGE);
//     }
//   };

//   const handlePrev = (setIndex, index) => {
//     if (index > 0) {
//       setIndex(index - ITEMS_PER_PAGE);
//     }
//   };

//   // Filter saved poses based on search query
//   const filteredPoses = savedPoses.filter((pose) =>
//     pose.name.toLowerCase().includes(poseSearchQuery.toLowerCase())
//   );

//   // Total pages for pagination
//   const totalPosePages = Math.ceil(filteredPoses.length / ITEMS_PER_PAGE);
//   const totalVideoPages = Math.ceil(profileVideos.length / ITEMS_PER_PAGE);

//   // Handle navigation to VideoSession component
//   const handleStartNewSession = () => {
//     navigate('/session');
//   };

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="section-container user-details">
//         <h2>User Details</h2>
//         <p>Username: {user.username}</p>
//         <p>Email: {user.email}</p>
//         <button className="button" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Yoga Streak Section */}
//       <div className="section-container yoga-streak">
//         <h2>Your Yoga Streak (Week starting {weekStart})</h2>
//         <div className="tracker">
//           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//             <button
//               key={day}
//               onClick={() =>
//                 yogaStreak.includes(day)
//                   ? handleUntrackDay(day)
//                   : handleTrackDay(day)
//               }
//               className={yogaStreak.includes(day) ? 'tracked' : ''}
//             >
//               {day}
//             </button>
//           ))}
//         </div>
//         <p>Progress: {yogaStreak.length}/7 days</p>
//         <progress value={streakProgress} max="100" />
//       </div>

//       {/* Search for Poses */}
//       <div className="section-container">
//         <input
//           type="text"
//           placeholder="Search saved poses..."
//           value={poseSearchQuery}
//           onChange={(e) => setPoseSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Saved Poses Section with Pagination */}
//       <div className="section-container saved-poses">
//         <h2>Saved Poses</h2>
//         {filteredPoses.length === 0 ? (
//           <p>No saved poses available.</p>
//         ) : (
//           <>
//             <div className="carousel">
//               {filteredPoses
//                 .slice(poseIndex, poseIndex + ITEMS_PER_PAGE)
//                 .map((pose, index) => (
//                   <div
//                     key={index}
//                     className="pose-item"
//                     onClick={() => handleReadMore(pose.name)}
//                   >
//                     <img
//                       src={pose.image_url || 'https://via.placeholder.com/150'}
//                       alt={pose.name}
//                       className="pose-image"
//                     />
//                     <p className="pose-name">{pose.name}</p>
//                   </div>
//                 ))}
//             </div>
//             <div className="pagination">
//               <button
//                 onClick={() => handlePrev(setPoseIndex, poseIndex)}
//                 disabled={poseIndex === 0}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {Math.floor(poseIndex / ITEMS_PER_PAGE) + 1} of{' '}
//                 {totalPosePages}
//               </span>
//               <button
//                 onClick={() =>
//                   handleNext(setPoseIndex, filteredPoses, poseIndex)
//                 }
//                 disabled={poseIndex >= filteredPoses.length - ITEMS_PER_PAGE}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Saved Videos Section with Pagination */}
//       <div className="section-container profile-videos">
//         <h2>Your Saved Videos</h2>
//         {profileVideos.length === 0 ? (
//           <p>No saved videos available.</p>
//         ) : (
//           <>
//             <div className="carousel">
//               {profileVideos
//                 .slice(videoIndex, videoIndex + ITEMS_PER_PAGE)
//                 .map((video, index) => (
//                   <div key={index} className="profile-video-item mb-4">
//                     <video
//                       src={video.videoPath}
//                       alt={`Video ${index + 1}`}
//                       className="profile-video-preview"
//                       onClick={() => handleWatchVideo(video.type)}
//                       controls
//                       muted
//                     />
//                     <p>
//                       {video.type === 'random'
//                         ? 'Random Video'
//                         : 'Selected Video'}
//                     </p>
//                   </div>
//                 ))}
//             </div>
//             <div className="pagination">
//               <button
//                 onClick={() => handlePrev(setVideoIndex, videoIndex)}
//                 disabled={videoIndex === 0}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {Math.floor(videoIndex / ITEMS_PER_PAGE) + 1} of{' '}
//                 {totalVideoPages}
//               </span>
//               <button
//                 onClick={() =>
//                   handleNext(setVideoIndex, profileVideos, videoIndex)
//                 }
//                 disabled={videoIndex >= profileVideos.length - ITEMS_PER_PAGE}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Video Session Stats Section */}
//       <div className="section-container video-stats">
//         <h2>Your Yoga Practice</h2>
//         <p>Poses Attempted Today: {attemptedPosesToday}</p>
//         <p>Total Videos Watched: {videoSessionHistory.length}</p>
//         <p>Total Time Spent: {videoSessionHistory.reduce((acc, session) => acc + session.duration, 0)} minutes</p>
//         {/* Button to start a new video session */}
//         <button className="button" onClick={handleStartNewSession}>
//           Start a New Session
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
