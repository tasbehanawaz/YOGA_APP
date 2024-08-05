
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import { Spinner, Button, Input, Select, Option } from '@material-tailwind/react';

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

  const handlePoseSelect = (pose) => {
    setSelectedPoses((prev) => {
      if (prev.includes(pose)) {
        return prev.filter((p) => p !== pose);
      } else {
        return [...prev, pose];
      }
    });
  };

  const handleGenerateVideo = () => {
    if (selectedPoses.length > 0) {
      navigate('/generate', { state: { selectedPoses, filters } });
    } else {
      alert('Please select at least two poses.');
    }
  };

  const handleSavePose = async (pose) => {
    try {
      const response = await axios.post(
        'http://localhost:8001/save_pose.php',
        {
          english_name: pose.english_name,
          pose_description: pose.pose_description,
          url_png: pose.url_png,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        alert('Pose saved successfully!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving the pose:', error);
      alert('Error saving pose.');
    }
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
          <Select name="difficulty_level" label="Difficulty Level" onChange={(value) => handleSelectChange('difficulty_level', value)}>
            <Option value="all">All</Option>
            <Option value="beginner">Beginner</Option>
            <Option value="intermediate">Intermediate</Option>
            <Option value="advanced">Advanced</Option>
          </Select>
          <Button className="apply-filters-btn" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
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
        </div>
      )}

      {loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="poses-grid">
          {poses.map((pose, index) => (
            <CardDefault
              key={index}
              className={`card-container ${selectedPoses.includes(pose.english_name) ? 'selected' : ''}`}
              name={pose.english_name}
              imageUrl={pose.url_png}
              poseDescription={pose.pose_benefits}
              difficultyLevel={pose.difficulty_level}
              onSave={() => handleSavePose(pose)}
              onClick={() => handlePoseSelect(pose.english_name)}
            />
          ))}
        </div>
      )}

      <div className="sticky-button-container">
        <Button className="generate-video-btn" onClick={handleGenerateVideo}>
          Generate Video
        </Button>
      </div>
    </div>
  );
};

export default Sequence;
