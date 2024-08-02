import React from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Profile = () => {
  const navigate = useNavigate(); // Create navigate function

  return (
    <div className="profile-container">
      <div style={{ textAlign: 'center' }}>
        <strong>Welcome Back!</strong>
      </div>


      
      <div style={{ textAlign: 'center' }}>
        Check out your upcoming appointments.
      </div>

      
      {/* User Details Section */}
      <div className="user-details">
        <h2>User Details</h2>
        <p>Here are the details of your account.</p>
        <ul>
          <li>Name: Jane Doe</li>
          <li>Email: janedoe@example.com</li>
          <li>Membership Status: Active</li>
        </ul>
      </div>



{/* Saved Poses Section */}
<div className="saved-poses">
  <h2>Saved Poses</h2>
  <p>Here are your saved yoga poses.</p>
  <ul>
    {/* You can map through savedPoses state or props here to display each saved pose */}
    {/* This is just an example. Replace with actual data fetching logic */}
    <li>Mountain Pose</li>
    <li>Downward Dog</li>
    <li>Warrior II</li>
    {/* More saved poses... */}
  </ul>
</div>


      {/* Upcoming Appointments Section */}
      <div className="upcoming-appointments">
        <h3>Upcoming Appointments</h3>
        <ul>
          <li>General Consultation - Tuesday</li>
          <li>Follow-up Session - Friday</li>
          <li>More appointments...</li>
        </ul>
      </div>

      {/* Service History Section */}
      <div className="service-history">
        <h2>Service History</h2>
        <ul>
          <li>Initial Consultation - Completed</li>
          <li>Monthly Check-up - Completed</li>
          <li>More history...</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div style={{ textAlign: 'center' }}>
        <h3>Having problems ?</h3>
        </div>
        <p>If you have any questions or need to reschedule, don't hesitate to reach out.</p>
      </div>

<div style={{ textAlign: 'center' }}>
        <p>Email: YogaApp@outlook.com</p>
      </div>
      {/* Logout Button */}
    </div>
  );


};

export default Profile;