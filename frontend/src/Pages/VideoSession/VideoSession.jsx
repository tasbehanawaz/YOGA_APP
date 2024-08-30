import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VideoSession.css';

const VideoSession = () => {
  const navigate = useNavigate();
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [completedPoses, setCompletedPoses] = useState([]);
  const [duration, setDuration] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (duration !== null && sessionActive) {
      fetchRandomPoses(duration);
    }
    return () => clearInterval(timerRef.current);
  }, [duration, sessionActive]);

  const fetchRandomPoses = async (duration) => {
    try {
      const response = await axios.get(
        `${process.env.VITE_BACKEND_URL}/FetchAllYogaPoses.php`
      );
      if (response.data.status === 'success') {
        const posesCount = duration === 3 ? 3 : duration === 8 ? 5 : 10;
        const randomPoses = response.data.data
          .sort(() => 0.5 - Math.random())
          .slice(0, posesCount);
        setSelectedPoses(randomPoses);
      } else {
        console.error('Error fetching poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching poses:', error);
    }
  };

  const startTimer = () => {
    setIsTimerStarted(true);
    setTimeRemaining(duration * 60); // Convert minutes to seconds
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimer(); // Start timer with the remaining time
  };

  const completeSession = () => {
    if (completedPoses.length === 0) {
      alert("Please select at least one pose as attempted before completing the session.");
      return;
    }
    
    clearInterval(timerRef.current);
    const sessionData = {
      duration,
      poseCount: selectedPoses.length,
      completedPoses: completedPoses,
      attemptedPosesCount: completedPoses.length,
      completedAt: new Date().toLocaleString(),
    };
    navigate('/profile', { state: { sessionDetails: sessionData } });
  };

  const cancelSession = () => {
    clearInterval(timerRef.current);
    setSessionActive(false);
    setSelectedPoses([]);
    setCompletedPoses([]);
    setDuration(null);
    setIsTimerStarted(false);
    navigate('/profile');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getProgressPercentage = () => {
    return ((duration * 60 - timeRemaining) / (duration * 60)) * 100;
  };

  const handleStartSession = (selectedDuration) => {
    setDuration(selectedDuration);
    setSessionActive(true);
  };

  const togglePoseCompletion = (pose) => {
    setCompletedPoses((prev) => {
      if (prev.includes(pose)) {
        return prev.filter((p) => p !== pose);
      } else {
        return [...prev, pose];
      }
    });
  };

  return (
    <div className="video-session-container">
      <div className="session-overview">
        <h1>Welcome to Your Yoga Session</h1>
        <p>
          This session will guide you through a series of yoga poses. You can
          select the duration of your session, and we will randomly generate
          poses for you to practice.
        </p>
        <p>
          During the session, you can pause and resume at any time. Once
          completed, you'll be able to track your progress and the poses you've
          completed.
        </p>
      </div>

      {sessionActive ? (
        <div>
          <h2>Video Session in Progress</h2>

          {isTimerStarted && (
            <div className="timer-display">
              <h3>Time Remaining: {formatTime(timeRemaining)}</h3>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="poses-container">
            {selectedPoses.map((pose, index) => (
              <div
                key={index}
                className={`pose-card ${
                  completedPoses.includes(pose) ? 'completed' : ''
                }`}
                onClick={() => togglePoseCompletion(pose)}
              >
                <img
                  src={pose.url_png}
                  alt={pose.english_name}
                  className="pose-image"
                />
                <div className="pose-details">
                  <h3>{pose.english_name}</h3>
                  <p>{pose.pose_description}</p>
                </div>
              </div>
            ))}
          </div>

          {isTimerStarted ? (
            <div className="session-controls">
              <button onClick={completeSession} disabled={completedPoses.length === 0}>
                Complete Session
              </button>
              <button onClick={cancelSession}>Cancel Session</button>
              {isPaused ? (
                <button onClick={resumeTimer}>Resume Session</button>
              ) : (
                <button onClick={pauseTimer}>Pause Session</button>
              )}
            </div>
          ) : (
            <div className="session-controls">
              <button onClick={startTimer}>Start Session</button>
              <button onClick={cancelSession}>Cancel Session</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Select Session Duration</h2>
          <p>
            Choose how long you want your yoga session to be. Based on your
            choice, we'll generate a sequence of poses for you to follow.
          </p>
          <div className="timer-buttons">
            <button onClick={() => handleStartSession(3)}>3 Minutes</button>
            <button onClick={() => handleStartSession(8)}>8 Minutes</button>
            <button onClick={() => handleStartSession(10)}>10 Minutes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSession;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './VideoSession.css';

// const VideoSession = () => {
//   const navigate = useNavigate();
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const [completedPoses, setCompletedPoses] = useState([]);
//   const [duration, setDuration] = useState(null);
//   const [timeRemaining, setTimeRemaining] = useState(0);
//   const [sessionActive, setSessionActive] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isTimerStarted, setIsTimerStarted] = useState(false);
//   const [sessionDetails, setSessionDetails] = useState({});
//   const timerRef = useRef(null);

//   useEffect(() => {
//     if (duration !== null && sessionActive) {
//       fetchRandomPoses(duration);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [duration, sessionActive]);

//   const fetchRandomPoses = async (duration) => {
//     try {
//       const response = await axios.get(
//         `${process.env.VITE_BACKEND_URL}/FetchAllYogaPoses.php`
//       );
//       if (response.data.status === 'success') {
//         const posesCount = duration === 3 ? 3 : duration === 8 ? 5 : 10;
//         const randomPoses = response.data.data
//           .sort(() => 0.5 - Math.random())
//           .slice(0, posesCount);
//         setSelectedPoses(randomPoses);
//         setSessionDetails({
//           duration,
//           poseCount: posesCount,
//           poses: randomPoses.map((pose) => pose.english_name),
//         });
//       } else {
//         console.error('Error fetching poses:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching poses:', error);
//     }
//   };

//   const startTimer = () => {
//     setIsTimerStarted(true);
//     setTimeRemaining(duration * 60); // Convert minutes to seconds
//     timerRef.current = setInterval(() => {
//       setTimeRemaining((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           completeSession();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const pauseTimer = () => {
//     clearInterval(timerRef.current);
//     setIsPaused(true);
//   };

//   const resumeTimer = () => {
//     setIsPaused(false);
//     startTimer(); // Start timer with the remaining time
//   };

//   const completeSession = () => {
//     if (completedPoses.length === 0) {
//       alert("Please select at least one pose as attempted before completing the session.");
//       return;
//     }
    
//     clearInterval(timerRef.current);
//     const sessionData = {
//       ...sessionDetails,
//       completedPoses: completedPoses.map((pose) => pose.english_name),
//       attemptedPosesCount: completedPoses.length,
//     };
//     navigate('/profile', { state: { sessionDetails: sessionData } });
//   };

//   const cancelSession = () => {
//     clearInterval(timerRef.current);
//     setSessionActive(false);
//     setSelectedPoses([]);
//     setCompletedPoses([]);
//     setDuration(null);
//     setIsTimerStarted(false);
//     navigate('/profile');
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const getProgressPercentage = () => {
//     return ((duration * 60 - timeRemaining) / (duration * 60)) * 100;
//   };

//   const handleStartSession = (selectedDuration) => {
//     setDuration(selectedDuration);
//     setSessionActive(true);
//   };

//   const togglePoseCompletion = (pose) => {
//     setCompletedPoses((prev) => {
//       if (prev.includes(pose)) {
//         return prev.filter((p) => p !== pose);
//       } else {
//         return [...prev, pose];
//       }
//     });
//   };

//   return (
//     <div className="video-session-container">
//       <div className="session-overview">
//         <h1>Welcome to Your Yoga Session</h1>
//         <p>
//           This session will guide you through a series of yoga poses. You can
//           select the duration of your session, and we will randomly generate
//           poses for you to practice.
//         </p>
//         <p>
//           During the session, you can pause and resume at any time. Once
//           completed, you'll be able to track your progress and the poses you've
//           completed.
//         </p>
//       </div>

//       {sessionActive ? (
//         <div>
//           <h2>Video Session in Progress</h2>

//           {isTimerStarted && (
//             <div className="timer-display">
//               <h3>Time Remaining: {formatTime(timeRemaining)}</h3>
//               <div className="progress-bar">
//                 <div
//                   className="progress-bar-fill"
//                   style={{ width: `${getProgressPercentage()}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}

//           <div className="poses-container">
//             {selectedPoses.map((pose, index) => (
//               <div
//                 key={index}
//                 className={`pose-card ${
//                   completedPoses.includes(pose) ? 'completed' : ''
//                 }`}
//                 onClick={() => togglePoseCompletion(pose)}
//               >
//                 <img
//                   src={pose.url_png}
//                   alt={pose.english_name}
//                   className="pose-image"
//                 />
//                 <div className="pose-details">
//                   <h3>{pose.english_name}</h3>
//                   <p>{pose.pose_description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {isTimerStarted ? (
//             <div className="session-controls">
//               <button onClick={completeSession} disabled={completedPoses.length === 0}>
//                 Complete Session
//               </button>
//               <button onClick={cancelSession}>Cancel Session</button>
//               {isPaused ? (
//                 <button onClick={resumeTimer}>Resume Session</button>
//               ) : (
//                 <button onClick={pauseTimer}>Pause Session</button>
//               )}
//             </div>
//           ) : (
//             <div className="session-controls">
//               <button onClick={startTimer}>Start Session</button>
//               <button onClick={cancelSession}>Cancel Session</button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div>
//           <h2>Select Session Duration</h2>
//           <p>
//             Choose how long you want your yoga session to be. Based on your
//             choice, we'll generate a sequence of poses for you to follow.
//           </p>
//           <div className="timer-buttons">
//             <button onClick={() => handleStartSession(3)}>3 Minutes</button>
//             <button onClick={() => handleStartSession(8)}>8 Minutes</button>
//             <button onClick={() => handleStartSession(10)}>10 Minutes</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoSession;
