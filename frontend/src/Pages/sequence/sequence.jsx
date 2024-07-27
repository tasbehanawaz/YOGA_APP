import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDefault } from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './sequence.css';
import { Spinner } from '@material-tailwind/react';

const Categories = () => {
  const [poses, setPoses] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPoses();
  }, []);

  const HandleReadMore = (poseName) => {
    navigate(`/pose/${poseName}`);
  };

  const fetchAllPoses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/FetchAllYogaPoses.php`
      );
      console.log('response.data', response.data);
      setPoses(response.data);
    } catch (error) {
      console.error('Error fetching the pose:', error);
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <div className="inset-0 flex items-center justify-center min-h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          <div className="flex flex-row w-full justify-center">
            {poses && poses.length > 0 ? (
              <h1 className="text-2xl font-bold mb-4">
                Found {poses.length} results
              </h1>
            ) : (
              <h1 className="text-2xl font-bold mb-4">No results found</h1>
            )}
          </div>
          {poses &&
            poses.map((pose, index) => (
              <CardDefault
                key={index}
                name={pose.english_name}
                imageUrl={pose.url_png}
                poseDescription={pose.pose_benefits}
                onSave={() => handleSavePose(pose)}
                buttonOnClick={() => HandleReadMore(pose.english_name)}
                className="m-12"
              />
            ))}
        </>
      )}
    </div>
  );
};

export default Categories;
