import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';

const YogaPoseDetails = () => {
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const [poseDetails, setPoseDetails] = useState({
    name: '',
    sanskritName: '', // Ensure consistency in naming
    imageUrl: '',
    poseDescription: '',
    poseBenefits: '',
    translationName: '', // Add missing field
  });

  useEffect(() => {
    const fetchPoseDetails = async () => {
      try {
        console.log(`Fetching details for pose: ${name}`); // Log pose name
        const response = await axios.get(
          'http://localhost:8001/FetchYogaPoses.php',
          { params: { poseName: name } }
        );

        console.log('API Response:', response.data); // Log response data

        const data = response.data;
        setPoseDetails({
          name: data.english_name,
          imageUrl: data.url_png,
          poseDescription: data.pose_description,
          poseBenefits: data.pose_benefits,
          sanskritName: data.sanskrit_name,
          translationName: data.translation_name,
        });
      } catch (error) {
        console.error('Failed to fetch pose details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoseDetails();
  }, [name]);

  return (
    <div
      id="container"
      className="flex flex-col justify-center items-center p-6 bg-gray-100 min-h-screen"
    >
      {loading ? (
        <div className="inset-0 flex items-center justify-center min-h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={poseDetails.imageUrl}
              alt="pose"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-4xl font-bold mb-4  text-gray-800">
              {poseDetails.name} ({poseDetails.sanskritName})
            </h1>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                Translation:
              </h2>
              <p className="text-gray-600">{poseDetails.translationName}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                Description
              </h2>
              <p className="text-gray-600">{poseDetails.poseDescription}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-700">
                Benefits
              </h2>
              <p className="text-gray-600">{poseDetails.poseBenefits}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaPoseDetails;
