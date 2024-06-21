import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardDefault } from '../../components/card/card';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button } from '@mui/material'; // Import Material-UI components

const Result = () => {
  const location = useLocation();
  const pose = location.state?.data;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof pose === 'object' && pose !== null) {
      setOpen(true); // Show the modal when pose data is valid
    } else {
      console.error('Expected pose to be an object, but got:', typeof pose);
    }
  }, [pose]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!pose || typeof pose !== 'object') {
    return <div>Invalid data passed to component</div>;
  }

  const { english_name, url_png, pose_benefits } = pose;
  if (!english_name || !url_png || !pose_benefits) {
    console.error('Pose data is missing required properties:', pose);
    return <div>Incomplete pose data</div>;
  }

  console.log(pose, 'pose');

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl text-gray-700 mb-5">Here is your Pose</h1>
      <CardDefault
        name={english_name}
        imageUrl={url_png}
        poseDescription={pose_benefits}
        className="w-72"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000 rounded',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your searched pose is saved
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have successfully saved the pose data.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

// Prop validation for CardDefault
CardDefault.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  poseDescription: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Result;
