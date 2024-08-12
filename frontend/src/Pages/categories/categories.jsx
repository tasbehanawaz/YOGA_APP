import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './categories.css';
import { Spinner, Button } from '@material-tailwind/react';

const Categories = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllPoses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = 'http://localhost:8001/fetchAllYogaPoses.php';
      const response = await axios.post(url, { difficulty_level: filter });
      if (response.data.status === 'success') {
        setPoses(response.data.data);
      } else {
        throw new Error(response.data.message || 'Error fetching poses');
      }
    } catch (error) {
      console.error('Error fetching the poses:', error);
      setError(error.message || 'Error fetching poses. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllPoses();
  }, [fetchAllPoses]);

  const handleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  const handleSavePose = async (pose) => {
    console.log('Saving pose:', pose);
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
    <div className="categories-container m-8">
      <div className="flex flex-row w-full justify-center mb-4">
        <Button onClick={() => setFilter('mixed')} className="mr-2">
          Mixed
        </Button>
        <Button onClick={() => setFilter('beginner')} className="mr-2">
          Beginner
        </Button>
        <Button onClick={() => setFilter('intermediate')} className="mr-2">
          Intermediate
        </Button>
        <Button onClick={() => setFilter('advanced')} className="mr-2">
          Advanced
        </Button>
      </div>
      <div className="flex flex-row w-full justify-center">
        {loading ? (
          <div className="inset-0 flex items-center justify-center min-h-screen">
            <Spinner className="h-12 w-12" />
          </div>
        ) : error ? (
          <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
        ) : poses.length > 0 ? (
          <h1 className="text-2xl font-bold mb-4">
            Found {poses.length} results
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">No results found</h1>
        )}
      </div>
      {!loading &&
        poses.map((pose, index) => (
          <CardDefault
            key={index}
            name={pose.english_name}
            imageUrl={pose.url_png}
            poseDescription={pose.pose_benefits}
            difficultyLevel={pose.difficulty_level}
            onSave={() => handleSavePose(pose)}
            buttonOnClick={() => handleReadMore(pose.english_name)}
            className="m-12"
          />
        ))}
    </div>
  );
};

export default Categories;
