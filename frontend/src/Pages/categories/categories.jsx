import { useState, useEffect } from 'react'; //storing the state of the component, use effect what happens when I create categoreis intinially
import axios from 'axios'; //fetching data from the backend
import { CardDefault } from '../../components/card/card';
import './categories.css';
const Categories = () => {
  const [poses, setPoses] = useState(null);

  // Call fetchAllPoses when the component mounts or is created initally
  useEffect(() => {
    fetchAllPoses();
  }, []);

  const fetchAllPoses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/FetchAllYogaPoses.php`
      );
      console.log('response.data', response.data);
      setPoses(response.data);
    } catch (error) {
      console.error('Error fetching the pose:', error);
    }
  };

  const handleSavePose = async (pose) => {
    console.log('Saving pose:', pose); // Debugging line
    try {
      const response = await axios.post('http://localhost:8001/backend/save_pose.php', {
        english_name: pose.english_name,
        pose_description: pose.pose_description,
        url_png: pose.url_png
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
      <div className="flex flex-row w-full justify-center">
        {poses && poses.length > 0 ? (
          <h1 className="text-2xl font-bold mb-4">
            Found {poses.length} results
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
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
            className="m-12"
          />
        ))}
    </div>
  );
};

export default Categories;
