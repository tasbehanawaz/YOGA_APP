import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import { Spinner, Button } from '@material-tailwind/react';
import { ButtonWithIcon } from '../../components/buttonWithIcon/buttonwithIcon';
import { SidebarWithBurgerMenu } from '../../components/sidebar/sidebar';

const Sequence = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [filters] = useState({
    focusAreas: [],
    difficulty: [],
  });
  const [checkedFocusAreas, setCheckedFocusAreas] = useState({}); //this stores the filters which are checked
  const [checkedDifficulty, setCheckedDifficulty] = useState({}); //this stores the filters which are checked
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [duration, setDuration] = useState(5); // Default to 5 minutes

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
        `${import.meta.env.VITE_BACKEND_URL}/FetchAllYogaPoses.php`
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/FetchAllYogaPoses.php`,
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

  const handleApplyFilters = () => {
    const focusAreaLabels = {
      0: 'Balance',
      1: 'Flexibility',
      2: 'Core',
      // Add other mappings as needed
    };

    const difficultyLabels = {
      0: 'Beginner',
      1: 'Intermediate',
      2: 'Advanced',
      // Add other mappings as needed
    };

    const selectedFocusAreas = Object.keys(checkedFocusAreas)
      .filter((key) => checkedFocusAreas[key])
      .map((key) => focusAreaLabels[key]);

    const selectedDifficulties = Object.keys(checkedDifficulty)
      .filter((key) => checkedDifficulty[key])
      .map((key) => difficultyLabels[key]);

    const filters = {
      difficulty_level: selectedDifficulties,
      focus_area: selectedFocusAreas,
    };

    fetchFilteredPoses(filters);
  };

  const handleResetFilters = () => {
    setCheckedFocusAreas({}); //untick the boxes
    setCheckedDifficulty({}); //untick the boxes
    fetchAllPoses(); // fetch all the data
    handleApplyFilters({});
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
    const storedGeneratedVideos =
      JSON.parse(localStorage.getItem('generatedVideos')) || [];

    const updatedGeneratedVideos = [videoDetails, ...storedGeneratedVideos];

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
          checkedFocusAreas={checkedFocusAreas}
          setCheckedFocusAreas={setCheckedFocusAreas}
          checkedDifficulty={checkedDifficulty}
          setCheckedDifficulty={setCheckedDifficulty}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          duration={duration}
          setDuration={setDuration}
          selectedPoses={selectedPoses}
          generateVideo={handleGenerateVideo}
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
              focusArea={pose.focus_area}
              onClick={() => handlePoseSelect(pose.english_name)}
              isSelected={selectedPoses.includes(pose.english_name)}
            />
          ))}
        </div>
      )}

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
      <div className="flex items-center"></div>
    </div>
  );
};

export default Sequence;
