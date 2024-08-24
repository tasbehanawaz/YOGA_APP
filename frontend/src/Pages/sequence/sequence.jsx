import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card'; // Assuming CardDefault is in this location
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import {
  Spinner,
  Button,
  Select,
  Option,
  Slider,
} from '@material-tailwind/react';
import { MdMenu, MdClose } from 'react-icons/md'; // Icons for toggle button

const Sequence = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [filters, setFilters] = useState({
    age: '',
    difficulty_level: 'all',
    focus_area: '',
  });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [duration, setDuration] = useState(5);
  const navigate = useNavigate();

  const focusAreas = ['Core', 'Flexibility', 'Balance', 'Strength'];

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
      console.error('Error fetching poses:', error);
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

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleApplyFilters = () => {
    fetchFilteredPoses(filters);
    setAppliedFilters(filters);
    setIsSidebarOpen(false);
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
      if (response.data.status === 'success') {
        setPoses(response.data.data);
      } else {
        console.error('Error fetching poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching poses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      age: '',
      difficulty_level: 'all',
      focus_area: '',
    });
    setDuration(5);
    fetchAllPoses();
    setAppliedFilters({});
    setIsSidebarOpen(false);
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
        imageUrl: selectedPosesDetails[0].imageUrl,
      };

      saveGeneratedVideo(newVideo);
      navigate('/generate', {
        state: { selectedPoses: newVideo.selectedPoses, filters, duration },
      });
    } else {
      alert('Please select at least two poses.');
    }
  };

  const handleGenerateRandomVideo = async () => {
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

      if (response.data.status === 'success') {
        const filteredPoses = response.data.data;

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
          imageUrl: randomPoses[0].imageUrl,
        };

        saveGeneratedVideo(newRandomVideo);
        navigate('/generate', {
          state: { selectedPoses: newRandomVideo.selectedPoses, filters },
        });
      } else {
        console.error('Error fetching filtered poses:', response.data.message);
      }
    } catch (error) {
      console.error('Error generating random video:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAppliedFilters = () => {
    const appliedFilterElements = [];

    if (appliedFilters.age) {
      appliedFilterElements.push(<p key="age">Age: {appliedFilters.age}</p>);
    }
    if (
      appliedFilters.difficulty_level &&
      appliedFilters.difficulty_level !== 'all'
    ) {
      appliedFilterElements.push(
        <p key="difficulty">Difficulty: {appliedFilters.difficulty_level}</p>
      );
    }
    if (appliedFilters.focus_area) {
      appliedFilterElements.push(
        <p key="focus_area">Focus Area: {appliedFilters.focus_area}</p>
      );
    }

    return appliedFilterElements;
  };

  return (
    <div
      className="relative max-w-7xl mx-auto py-8 px-4"
      style={{ paddingTop: '100px' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Select Yoga Poses</h1>
        <Button
          className="bg-blue-500 text-white flex items-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          <span className="ml-2">
            {isSidebarOpen ? 'Close Filters' : 'Filters'}
          </span>
        </Button>
      </div>

      {isSidebarOpen && (
        <>
          <div
            className="fixed-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="fixed-sidebar p-6">
            <h2 className="text-2xl font-bold mb-4">Filter Options</h2>

            <div className="filter-inputs space-y-4">
              <Select
                name="age"
                label="Age Range"
                value={filters.age}
                onChange={(value) => handleSelectChange('age', value)}
              >
                <Option value="18-25">18-25</Option>
                <Option value="26-30">26-30</Option>
                <Option value="31-50">31-50</Option>
                <Option value="50+">Above 50</Option>
              </Select>

              <Select
                name="difficulty_level"
                label="Difficulty Level"
                value={filters.difficulty_level}
                onChange={(value) =>
                  handleSelectChange('difficulty_level', value)
                }
              >
                <Option value="all">All</Option>
                <Option value="Beginner">Beginner</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>

              <Select
                name="focus_area"
                label="Focus Area"
                value={filters.focus_area}
                onChange={(value) => handleSelectChange('focus_area', value)}
              >
                <Option value="">None</Option>
                {focusAreas.map((area) => (
                  <Option key={area} value={area}>
                    {area}
                  </Option>
                ))}
              </Select>

              <div>
                <h2 className="text-lg font-semibold mt-4">
                  Video Duration: {duration} minutes
                </h2>
                <Slider
                  value={duration}
                  onChange={handleDurationChange}
                  min={1}
                  max={60}
                  step={1}
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <Button
                  className="bg-blue-500 text-white w-full text-sm py-2 px-3"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  className="bg-red-500 text-white w-full text-sm py-2 px-3"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>

              <Button
                className="bg-yellow-500 text-white w-full mt-4"
                onClick={handleGenerateRandomVideo}
              >
                Generate Filtered Random Session
              </Button>
            </div>
          </div>
        </>
      )}

      {Object.keys(appliedFilters).length > 0 && (
        <div className="applied-filters mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Applied Filters</h2>
          {renderAppliedFilters()}
        </div>
      )}

      <div className="w-full">
        <div className="poses-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            poses.map((pose, index) => (
              <CardDefault
                key={index}
                name={pose.english_name}
                imageUrl={pose.url_png}
                poseDescription={pose.pose_benefits}
                difficultyLevel={pose.difficulty_level}
                focusArea={pose.focus_area}
                onClick={() => handlePoseSelect(pose.english_name)}
                isSelected={selectedPoses.includes(pose.english_name)} // Add this line
              />
            ))
          )}
        </div>
      </div>

      <div className="sticky-button-container mt-10 flex space-x-4 justify-center">
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
          Generate Random Session
        </Button>
      </div>
    </div>
  );
};

export default Sequence;
