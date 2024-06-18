import { useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import './form.css';

export function SimpleRegistrationForm() {
  // State for the form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setSuccess('');
  
    // Sending data to the PHP backend
    const response = await fetch('http://localhost:8001/register.php', {  // Updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': username,
        'email': email,
        'password': password,
      })
    });
    const responseData = await response.json();
    if (responseData.error) {
      setError(responseData.error);
    } else {
      setSuccess(responseData.success);
      // Reset fields
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };  

  return (
    <div className="form_container">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">Sign Up</Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">Your Name</Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">Your Email</Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">Password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <Checkbox label="I agree to the Terms and Conditions" />
          <Button type="submit" className="mt-6" fullWidth>Sign Up</Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account? <a href="#" className="font-medium text-gray-900">Sign In</a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
