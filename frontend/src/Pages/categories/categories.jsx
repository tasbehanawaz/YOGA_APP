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

  return (
    <div className="categories-container m-8">
      {poses &&
        poses.map((pose, index) => (
          <CardDefault
            key={index}
            name={pose.english_name}
            imageUrl={pose.url_png}
            poseDescription={pose.pose_benefits}
          />
        ))}
    </div>
  );
};

export default Categories;