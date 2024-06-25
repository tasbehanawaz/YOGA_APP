import  { useState } from 'react';
import axios from 'axios';
// import { Sequence } from './sequence/sequence';



const VideoGenerator = () => {
// eslint-disable-next-line no-unused-vars
const [selectedPoses, setSelectedPoses] = useState([]); // Assuming an initial state for selectedPoses
const [videoUrl, setVideoUrl] = useState('');
const [loading, setLoading] = useState(false);

const handleGenerateVideo = () => {setLoading(true);
 axios.post('http://localhost:8001/yoga_sequence.mp4', { poses: selectedPoses }).then((response) => {
  setLoading(false);
   if (response.data.videoPath) {
     setVideoUrl(response.data.videoPath);
    } else {
       console.error('Error generating video:', response.data.error);
        alert('Failed to generate video.');
     }
    }).catch((error) => {
      setLoading(false);
      console.error('Error generating video:', error);
      alert('Error generating video.');
    });
};

 return (
  <div>
   <button onClick={handleGenerateVideo} disabled={loading}>
    {loading ? 'Generating...' : 'Generate Video'}
   </button>
    {videoUrl && (
     <video src={videoUrl} controls onError={() => alert('Error loading video.')} />)}
     </div>
);
};

export default VideoGenerator;