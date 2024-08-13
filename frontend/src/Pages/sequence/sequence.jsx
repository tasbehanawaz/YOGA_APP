import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import {
  Spinner,
  Button,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import { ButtonWithIcon } from '../../components/buttonWithIcon/buttonwithIcon';
import { SidebarWithBurgerMenu } from '../../components/sidebar/sidebar';

const Sequence = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [filters, setFilters] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    difficulty_level: 'all',
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPoses();
  }, []);

  const fetchAllPoses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8001/FetchAllYogaPoses.php'
      );
      if (response.data.status === 'success') {
        setPoses(response.data.data);
      } else {
        console.error('Error fetching poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching the pose:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredPoses = async (filters) => {
    setLoading(true);
    console.log('Applying filters:', filters);
    try {
      const response = await axios.post(
        'http://localhost:8001/FetchAllYogaPoses.php',
        filters,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Filtered response:', response.data);
      if (response.data.status === 'success') {
        setPoses(response.data.data);
      } else {
        console.error('Error fetching poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching the pose:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    fetchFilteredPoses(filters);
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      age: '',
      height: '',
      weight: '',
      gender: '',
      difficulty_level: 'all',
    });
    fetchAllPoses();
    setAppliedFilters({});
  };

  const handlePoseSelect = (poseName) => {
    setSelectedPoses((prev) => {
      if (prev.includes(poseName)) {
        return prev.filter((p) => p !== poseName);
      } else {
        return [...prev, poseName];
      }
    });
  };

  const saveGeneratedVideo = (videoDetails) => {
    // Retrieve existing videos from localStorage
    const storedGeneratedVideos =
      JSON.parse(localStorage.getItem('generatedVideos')) || [];

    // Add the new video details to the existing list
    const updatedGeneratedVideos = [videoDetails, ...storedGeneratedVideos];

    // Save updated list to localStorage
    localStorage.setItem(
      'generatedVideos',
      JSON.stringify(updatedGeneratedVideos)
    );
  };

  const handleGenerateVideo = () => {
    if (selectedPoses.length > 0) {
      const selectedPosesDetails = selectedPoses.map((poseName) => {
        const pose = poses.find((p) => p.english_name === poseName);
        return {
          poseName: pose.english_name,
          imageUrl: pose.url_png || 'https://via.placeholder.com/150',
        };
      });

      const newVideo = {
        type: 'selected',
        selectedPoses: selectedPosesDetails.map((pose) => pose.poseName),
        imageUrl: selectedPosesDetails[0].imageUrl, // Use the first pose's image as a thumbnail
      };

      // Save the generated video details to localStorage
      saveGeneratedVideo(newVideo);

      navigate('/generate', {
        state: { selectedPoses: newVideo.selectedPoses, filters },
      });
    } else {
      alert('Please select at least two poses.');
    }
  };

  const handleGenerateRandomVideo = () => {
    const randomPoses = [];
    const posesCopy = [...poses];

    while (randomPoses.length < 5 && posesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * posesCopy.length);
      const pose = posesCopy[randomIndex];
      randomPoses.push({
        poseName: pose.english_name,
        imageUrl: pose.url_png || 'https://via.placeholder.com/150',
      });
      posesCopy.splice(randomIndex, 1);
    }

    const newRandomVideo = {
      type: 'random',
      selectedPoses: randomPoses.map((pose) => pose.poseName),
      imageUrl: randomPoses[0].imageUrl, // Use the first pose's image as a thumbnail
    };

    // Save the generated random video details to localStorage
    saveGeneratedVideo(newRandomVideo);

    navigate('/generate', {
      state: { selectedPoses: newRandomVideo.selectedPoses, filters },
    });
  };

  const handleGenerateFilteredRandomVideo = () => {
    const filteredPoses = poses.filter(
      (pose) => pose.difficulty_level === filters.difficulty_level
    );
    const randomPoses = [];
    const posesCopy = [...filteredPoses];

    while (randomPoses.length < 5 && posesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * posesCopy.length);
      const pose = posesCopy[randomIndex];
      randomPoses.push({
        poseName: pose.english_name,
        imageUrl: pose.url_png || 'https://via.placeholder.com/150',
      });
      posesCopy.splice(randomIndex, 1);
    }

    const newRandomVideo = {
      type: 'random',
      selectedPoses: randomPoses.map((pose) => pose.poseName),
      imageUrl: randomPoses[0].imageUrl, // Use the first pose's image as a thumbnail
    };

    // Save the generated random video details to localStorage
    saveGeneratedVideo(newRandomVideo);

    navigate('/generate', {
      state: { selectedPoses: newRandomVideo.selectedPoses, filters },
    });
  };

  return (
    <div className="sequence-container">
      <div className="filter-options">
        <h1 className="text-1xl font-bold mb-2">Select Yoga Poses</h1>

        <ButtonWithIcon onClick={openDrawer} />
        <SidebarWithBurgerMenu
          isDrawerOpen={isDrawerOpen}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="poses-grid">
          {poses.map((pose, index) => (
            <CardDefault
              key={index}
              name={pose.english_name}
              imageUrl={pose.url_png}
              poseDescription={pose.pose_benefits}
              difficultyLevel={pose.difficulty_level}
              onSave={() => handleSavePose(pose)}
              onClick={() => handlePoseSelect(pose.english_name)}
              isSelected={selectedPoses.includes(pose.english_name)}
            />
          ))}
        </div>
      )}

      {/* Sticky Container */}
      <div className="sticky-button-container">
        <Button
          className="bg-blue-900 text-white py-2 px-4 rounded"
          onClick={handleGenerateVideo}
        >
          Generate Video
        </Button>
        <Button
          className="bg-green-900 text-white py-2 px-4 rounded"
          onClick={handleGenerateRandomVideo}
        >
          Generate Random Video
        </Button>
      </div>
    </div>
  );
};

export default Sequence;
