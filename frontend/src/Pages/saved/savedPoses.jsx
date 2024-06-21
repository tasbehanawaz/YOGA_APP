import { useState, useEffect } from 'react';
import axios from 'axios';

const SavedPoses = () => {
    const [savedPoses, setSavedPoses] = useState([]);

    useEffect(() => {
        const fetchSavedPoses = async () => {
            try {
                const response = await axios.get('http://localhost:8001/backend/get_saved_poses.php');
                console.log("Fetched Poses: ", response.data); // Debugging line
                setSavedPoses(response.data); // Assuming the array is directly in data
            } catch (error) {
                console.error('Error fetching saved poses:', error);
            }
        };

        fetchSavedPoses();
    }, []);

    return (
        <div>
            {savedPoses.map(pose => (
                <div key={pose.id}>
                    <h3>{pose.name}</h3>
                    {/* <img src={pose.image_url} alt={pose.name} /> */}
                    <p>{pose.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SavedPoses;
