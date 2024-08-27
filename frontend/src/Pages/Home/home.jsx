import { CarouselDefault } from '../../components/carousel/carousel';
import { Typography, Button } from '@material-tailwind/react';
import ButtonWithLink from '../../components/buttonWithLink/ButtonWithLink'; // Correct import path with case sensitivity
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './home.css'; // Import custom CSS for additional styling

const Program = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate checking authentication status
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <div className="box hero-section text-black">
        {/* Changed text color to black */}
        <Typography variant="h4" className="pt-20 font-bold text-center">
          Find Your Inner Peace with Yoga App
        </Typography>
        <div className="mt-4">
          <CarouselDefault />
        </div>
        <div className="mt-8 text-center">
          {/* Add text to guide users to generate a sequence */}
          <div className="flex flex-col items-center">
            <Typography variant="paragraph" className="text-lg text-gray-700 mb-2 text-center">
              Try generating a sequence to kickstart your practice!
            </Typography>
            {/* Optionally, add an arrow pointing to the button */}
            <div className="arrow-down mb-2"></div>
            <ButtonWithLink/>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about mt-12 py-8 bg-gray-100">
        <Typography variant="h3" className="text-center font-bold">About Yoga App</Typography>
        <Typography variant="paragraph" className="mt-6 mx-auto text-lg text-gray-700 max-w-3xl text-center leading-relaxed">
          Welcome to the Yoga App – the ultimate tool to elevate your yoga practice. With Yoga App, you can generate personalized yoga sequences based on your needs and goals, watch yoga videos to follow along, or focus on individual poses to perfect your technique. Our app also helps you track your daily yoga sessions, holding you accountable and motivating you to stay consistent in your practice. Whether you're a beginner or an advanced yogi, Yoga App has everything you need to create the perfect yoga experience.
        </Typography>
      </div>

      {/* Teasers for Premium Features */}
      <div className="features mt-12 py-12 bg-white">
        <Typography variant="h4" className="text-center font-bold">
          Unlock the Full Experience with Yoga App
        </Typography>
        <div className="feature-grid mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="feature-card p-6 border rounded-lg shadow-lg bg-gray-50">
            <Typography variant="h6" className="font-bold">Generate Custom Yoga Sequences</Typography>
            <p className="text-gray-700 mt-4">
              Create personalized yoga sequences tailored to your fitness goals. Mix and match poses, adjust difficulty levels, and make your routine unique.
            </p>
            <Button onClick={() => navigate('/login')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
              Sign Up To Unlock
            </Button>
          </div>
          <div className="feature-card p-6 border rounded-lg shadow-lg bg-gray-50">
            <Typography variant="h6" className="font-bold">Watch Yoga Sequences as Videos</Typography>
            <p className="text-gray-700 mt-4">
              Follow along with videos for each sequence you create, helping you perfect your flow and form from the comfort of your home.
            </p>
            <Button onClick={() => navigate('/login')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
              Sign Up To Unlock
            </Button>
          </div>
          <div className="feature-card p-6 border rounded-lg shadow-lg bg-gray-50">
            <Typography variant="h6" className="font-bold">Track Your Daily Yoga Practice</Typography>
            <p className="text-gray-700 mt-4">
              Stay accountable with our daily yoga tracker. Monitor how many sessions you complete each day, set goals, and track your progress.
            </p>
            <Button onClick={() => navigate('/login')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
              Sign Up To Unlock
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials mt-12 py-12 bg-gray-50">
        <Typography variant="h4" className="text-center font-bold">What Our Users Say</Typography>
        <div className="testimonial-grid mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="testimonial-card p-6 border rounded-lg shadow-lg bg-white">
            <p className="text-gray-700">
              "Yoga App has transformed the way I practice yoga. Being able to generate my own sequences and follow them through videos has been a game-changer!" - Emma, Beginner Yogi
            </p>
          </div>
          <div className="testimonial-card p-6 border rounded-lg shadow-lg bg-white">
            <p className="text-gray-700">
              "The daily tracker keeps me accountable, and I love how I can focus on individual poses to improve my technique. Highly recommend!" - Michael, Advanced Practitioner
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta mt-12 py-12 bg-blue-500 text-white">
        <Typography variant="h3" className="text-center font-bold">
          Ready to Transform Your Yoga Practice?
        </Typography>
        <Typography variant="paragraph" className="text-center mt-4 mx-auto max-w-2xl text-lg leading-relaxed">
          Sign up today and unlock the full potential of Yoga App. Generate custom sequences, track your progress, and follow along with video guides to enhance your practice.
        </Typography>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate('/login')} size="lg" className="bg-white text-blue-500 hover:bg-gray-100">
            Sign Up Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Program;
