import React from 'react';
import './about.css'; // Ensure this path is correct

const Instructor = ({ name, bio, imageUrl, backgroundImageUrl, badgeUrl }) => (
  <div className="instructor" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
    <div className="instructor-image-container">
         <h3>{name}</h3>
      <img src={imageUrl} alt={name}/>
    </div>
    <p>{bio}</p>
    {badgeUrl && <img src={badgeUrl} alt="Certification Badge" className="instructor-badge" />}
  </div>

  
);

const About = () => {
  const instructors = [
   {
    id: 1,
    name: 'Jasmine Smith', // Corrected the capitalization
    bio: 'Jasmine, a certified teacher with over 8 years of experience, offers a comprehensive yoga journey tailored to all levels. From beginners seeking to learn the basics, intermediates looking to deepen their practice, to advanced yogis aiming to explore new heights.',
    imageUrl: '/public/images/yoga2.webp',
    // backgroundImageUrl: '/path/to/background-image.jpg',
    badgeUrl: '/public/images/badge.webp',
  },
  {
    id: 2,
    name: 'Alex Hooper',
    bio: 'Alex is a dedicated Ashtanga yoga instructor with 5 years of teaching experience, passionate about holistic wellness and meditation. Alex specializes in intermediate levels, focusing on the development of strength and flexibility.',
    imageUrl: '/public/images/yoga3.webp',
    // backgroundImageUrl: '/path/to/background-image.jpg',
    badgeUrl: '/public/images/badge.webp',
  },
  {
    id: 3,
    name: 'Timothy jones',
    bio: 'With over 15 years of experience, Timothy is an expert in advanced yoga techniques. They focus on advanced students, aiming to explore the depths of yoga practice and meditation for spiritual growth.',
    imageUrl: '/public/images/yoga4.webp',
    // backgroundImageUrl: '/path/to/background-image.jpg',
    badgeUrl: '/public/images/badge.webp',
  },

  {
    id: 4,
    name: 'Mia Green',
    bio: 'Mia has been practicing yoga for over 10 years and specializes in guiding beginners. They believe in the power of mindfulness and physical strength to lay a solid foundation for yoga practice.',
    imageUrl: '/public/images/yoga1.webp',
   // backgroundImageUrl: '/path/to/background-image.jpg',
    badgeUrl: '/public/images/badge.webp',
    
  }
];

  return (
    <div className="about-container">
      <h1 className="bold-title">About Us</h1>
      <p>Welcome to our Yoga community. Our mission is to bring peace, health, and wellness to all through the practice of yoga. Whether you're a beginner or an experienced yogi, we offer a variety of classes designed to fit your needs.</p>
      <p>Our experienced instructors are passionate about helping each student find their path to personal growth and wellness. We believe in the power of yoga to transform lives, and we're here to support you on your journey.</p>
      <h2>Our Philosophy</h2>
      <p>At the heart of our practice is the belief that yoga is for everyone. We strive to create a welcoming, inclusive environment where individuals of all backgrounds and skill levels can come together to practice, learn, and grow.</p>
      <p>We focus on the holistic benefits of yoga, including physical health, mental clarity, and emotional well-being. Our classes are designed to challenge and inspire you, helping you to achieve balance and harmony in every aspect of your life.</p>
     
     
     
      <h2 class="centered-title">Meet Our Instructors</h2>
      <div className="instructors-container">
       {instructors.map((instructor) => (
  <Instructor key={instructor.id} {...instructor} />
  
))}
      </div>
      <h2>Join Our Community</h2>
      <p>If you're looking to deepen your yoga practice, connect with like-minded individuals, or simply find a moment of peace in your busy day, we invite you to join us. Explore our website to learn more about our classes, instructors, and special events. Welcome to your yoga journey.</p>
    </div>
  );
};

export default About;