import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import { Spinner, Button, Input, Select, Option } from '@material-tailwind/react';
import React from 'react';

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
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPoses();
  }, []);

  const fetchAllPoses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/FetchAllYogaPoses.php');
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
      const response = await axios.post('http://localhost:8001/FetchAllYogaPoses.php', filters, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
    const storedGeneratedVideos = JSON.parse(localStorage.getItem('generatedVideos')) || [];

    // Add the new video details to the existing list
    const updatedGeneratedVideos = [videoDetails, ...storedGeneratedVideos];

    // Save updated list to localStorage
    localStorage.setItem('generatedVideos', JSON.stringify(updatedGeneratedVideos));
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

      navigate('/generate', { state: { selectedPoses: newVideo.selectedPoses, filters } });
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

    navigate('/generate', { state: { selectedPoses: newRandomVideo.selectedPoses, filters } });
  };


  const handleGenerateFilteredRandomVideo = () => {

    // console.log('Poses:', JSON.stringify(poses));
    // console.log('Filters:', JSON.stringify(filters));

    const filteredPoses = poses.filter((pose) => pose.difficulty_level === filters.difficulty_level);
    const randomPoses = [];
    const posesCopy = [...filteredPoses];

    // console.log('Filtered poses:', JSON.stringify(filteredPoses));
    // console.log('Poses copy:', JSON.stringify(posesCopy));

    while (randomPoses.length < 2 && posesCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * posesCopy.length);
      const pose = posesCopy[randomIndex];
      randomPoses.push({
        poseName: pose.english_name,
        imageUrl: pose.url_png || 'https://via.placeholder.com/150',
      });
      posesCopy.splice(randomIndex, 1);
    }

    console.log('Filter poses:', JSON.stringify(randomPoses));

    const newRandomVideo = {
      type: 'random',
      selectedPoses: randomPoses.map((pose) => pose.poseName),
      imageUrl: randomPoses[0].imageUrl, // Use the first pose's image as a thumbnail
    };

    // Save the generated random video details to localStorage
    saveGeneratedVideo(newRandomVideo);

    navigate('/generate', { state: { selectedPoses: newRandomVideo.selectedPoses, filters } });
  };

  return (
    <div className="sequence-container">
      <h1 className="title">Select Yoga Poses</h1>

      <div className="filter-options">
        <h2 className="filter-title">Filter Options</h2>
        <div className="filter-inputs">
          <Input name="age" type="number" label="Age" onChange={handleFilterChange} value={filters.age} />
          <Input name="height" type="number" label="Height (feet)" onChange={handleFilterChange} value={filters.height} step="0.1" />
          <Input name="weight" type="number" label="Weight (kg)" onChange={handleFilterChange} value={filters.weight} />
          <Select name="gender" label="Gender" onChange={(value) => handleSelectChange('gender', value)}>
            <Option value="women">Women</Option>
            <Option value="man">Man</Option>
            <Option value="non-binary">Non-binary</Option>
          </Select>
          <Select name="difficulty_level" label="Difficulty Level" onChange={(value) => handleSelectChange('difficulty_level', value)} 
          data-testid="difficulty-level-select">
            <Option value="all">All</Option>
            <Option value="Beginner">Beginner</Option>
            <Option value="Intermediate">Intermediate</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
          <div className="filter-buttons">
            <Button className="apply-filters-btn" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button className="reset-filters-btn" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {Object.keys(appliedFilters).length > 0 && (
        <div className="applied-filters">
          <h2 className="applied-filters-title">Applied Filters</h2>
          {appliedFilters.age && <p>Age: {appliedFilters.age}</p>}
          {appliedFilters.height && <p>Height: {appliedFilters.height}</p>}
          {appliedFilters.weight && <p>Weight: {appliedFilters.weight}</p>}
          {appliedFilters.gender && <p>Gender: {appliedFilters.gender}</p>}
          {appliedFilters.difficulty_level && <p>Difficulty Level: {appliedFilters.difficulty_level}</p>}
          <Button className="random-video-btn" onClick={handleGenerateFilteredRandomVideo}>
            Generate Session
          </Button>
        </div>
      )}

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

      <div className="sticky-button-container">
        <Button className="bg-blue-900 text-white py-2 px-4 rounded" onClick={handleGenerateVideo}>
          Generate Video
        </Button>
        <Button className="bg-green-900 text-white py-2 px-4 rounded" onClick={handleGenerateRandomVideo}>
          Generate Random Session
        </Button>
      </div>
    </div>
  );
};

export default Sequence;
