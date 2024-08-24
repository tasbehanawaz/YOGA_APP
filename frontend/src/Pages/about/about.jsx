import React from 'react';
import './about.css'; // Ensure this path is correct

const Instructor = ({ name, bio, imageUrl, backgroundImageUrl, badgeUrl }) => (
  <div className="instructor" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
    <div className="instructor-image-container">
      <h3>{name}</h3>
      <img src={imageUrl} alt={name} />
    </div>
    <p>{bio}</p>
    {badgeUrl && <img src={badgeUrl} alt="Certification Badge" className="instructor-badge" />}
  </div>
);

const About = () => {
  const instructors = [
    {
      id: 1,
      name: 'Jasmine Smith',
      bio: 'Jasmine, a certified teacher with over 8 years of experience, specializes in creating personalized yoga sequences for every level. Her focus is on providing students with custom sequences and helping them achieve their goals through guided video sessions and pose-specific practices.',
      imageUrl: '/public/images/yoga2.webp',
      badgeUrl: '/public/images/badge.webp',
    },
    {
      id: 2,
      name: 'Alex Hooper',
      bio: 'Alex is a dedicated Ashtanga yoga instructor with 5 years of experience. He excels at creating intermediate-level sequences that improve strength and flexibility, and his video sessions focus on achieving balance between physical and mental wellness.',
      imageUrl: '/public/images/yoga3.webp',
      badgeUrl: '/public/images/badge.webp',
    },
    {
      id: 3,
      name: 'Timothy Jones',
      bio: 'With over 15 years of experience, Timothy is an expert in advanced yoga techniques. He works closely with students to develop sequences that target advanced poses, ensuring they push their practice to new levels while tracking their daily progress.',
      imageUrl: '/public/images/yoga4.webp',
      badgeUrl: '/public/images/badge.webp',
    },
    {
      id: 4,
      name: 'Mia Green',
      bio: 'Mia has been practicing yoga for over 10 years, and her passion lies in introducing beginners to yoga through tailored sequences. She focuses on foundational poses, mindfulness, and guiding students through video sessions to build confidence and strength.',
      imageUrl: '/public/images/yoga1.webp',
      badgeUrl: '/public/images/badge.webp',
    },
  ];

  return (
    <div className="about-container">
      <h1 className="bold-title">About Yoga App</h1>
      <p>
        Welcome to Yoga App, the ultimate destination for creating custom yoga sequences, watching instructional videos, and tracking your progress. Our platform allows you to tailor your yoga practice to your personal needs, whether you're a beginner looking to learn the basics, or an advanced practitioner aiming to deepen your knowledge.
      </p>
      <p>
        With Yoga App, you can generate your own yoga sequences, follow along with expert-led video guides, focus on mastering individual poses, and track your daily yoga sessions to stay accountable. We believe that yoga is not just about physical health, but also mental clarity and emotional well-being.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        At Yoga App, our mission is to make yoga accessible to everyone by providing tools that empower users to take control of their practice. Whether you're at home or on the go, Yoga App offers you the ability to create, practice, and grow with flexibility and ease.
      </p>
      <p>
        Our features include the ability to generate custom sequences, access video tutorials, focus on individual poses for improvement, and track your daily sessions to keep you motivated and on track. We strive to offer a holistic approach to yoga that fits into your lifestyle.
      </p>
      
      <h2 className="centered-title">Meet Our Instructors</h2>
      <div className="instructors-container">
        {instructors.map((instructor) => (
          <Instructor key={instructor.id} {...instructor} />
        ))}
      </div>

      <h2>Why Choose Yoga App?</h2>
      <p>
        Yoga App is more than just a yoga platform – it’s a tool to enhance your overall well-being. Our app allows you to:
      </p>
      <ul>
        <li>Create custom yoga sequences based on your fitness goals and experience level.</li>
        <li>Follow along with high-quality instructional videos led by expert instructors.</li>
        <li>Track your daily yoga sessions to stay consistent and motivated.</li>
        <li>Focus on mastering individual poses through targeted practice sessions.</li>
      </ul>

      <h2>Join Our Community</h2>
      <p>
        We invite you to become part of our growing yoga community. Whether you're just starting out or looking to deepen your practice, Yoga App has something for everyone. Explore our instructors, try out our sequence generator, and see how Yoga App can help you on your yoga journey.
      </p>
    </div>
  );
};

export default About;
