
import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavedPoses = () => {
    const [savedPoses, setSavedPoses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedPoses = async () => {
            try {
                const response = await axios.get('http://localhost:8001/get_saved_poses.php');
                console.log("Fetched Poses: ", response.data); // Debugging line
                setSavedPoses(response.data); // Assuming the array is directly in data
            } catch (error) {
                console.error('Error fetching saved poses:', error);
            }
        };

        fetchSavedPoses();
    }, []);

    // Function to handle the "Read More" button click
    const handleReadMore = (poseName) => {
        navigate(`/pose/${poseName}`);
    };

    // Function to handle resetting saved poses
    const handleResetPoses = async () => {
        try {
            const response = await axios.post('http://localhost:8001/reset_saved_poses.php');
            if (response.data.success) {
                setSavedPoses([]); // Clear the saved poses in the front-end state
                console.log(response.data.message);
            } else {
                console.error('Failed to reset saved poses:', response.data.message);
            }
        } catch (error) {
            console.error('Error resetting saved poses:', error);
        }
    };

    if (savedPoses.length === 0) {
        return (
            <div>
                <div>No saved poses available.</div>
                <button onClick={handleResetPoses} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Reset Saved Poses</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center py-8">
            <button onClick={handleResetPoses} className="mb-4 bg-red-500 text-white py-2 px-4 rounded">Reset Saved Poses</button>
            <div className="flex flex-wrap justify-center gap-6">
                {savedPoses.map(pose => (
                    <CardDefault
                        key={pose.id}
                        name={pose.name}
                        imageUrl={pose.image_url || 'https://via.placeholder.com/150'} // Placeholder if image_url is not available
                        poseDescription={pose.description}
                        onClick={() => console.log(`Clicked on ${pose.name}`)}
                        onSave={() => console.log(`Saved ${pose.name}`)}
                        isSelected={false}
                        buttonOnClick={() => handleReadMore(pose.name)} // Add Read More button functionality
                    />
                ))}
            </div>
        </div>
    );
};

export default SavedPoses;
