import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';
import './signIn.css'; // Ensure you have the same CSS styles as your signup form

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8001/signin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            setSuccess("Sign-in successful. Redirecting..."); // Set success message
            setTimeout(() => {
                navigate('/');  // Delay and then redirect to the home page
            }, 500); // Delay in milliseconds
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="form_container">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">Sign In</Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Please enter your credentials to log in.
                </Typography>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
                <form onSubmit={handleSignIn} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col">
                        <Typography variant="h6" color="blue-gray">Username</Typography>
                        <Input
                            size="lg"
                            placeholder="Your Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        <Typography variant="h6" color="blue-gray">Password</Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>Sign In</Button>
                </form>
            </Card>
        </div>
    );
}

export default SignIn;
