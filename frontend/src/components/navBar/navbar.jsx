import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Typography, Button, Input } from '@material-tailwind/react';
import './navbar.css';

export function NavbarWithSearch() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/FetchYogaPoses.php?poseName=${searchQuery}`
      );
      setLoading(false);
      navigate('/search', { state: { data: response.data } });
    } catch (error) {
      console.error('Error fetching the pose:', error);
      setLoading(false);
    }
  };


const navList = (
  <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/"
        className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
        activeClassName="highlight"
      >
        Home
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/categories"
        className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
        activeClassName="highlight"
      >
        Categories
      </NavLink>
    </Typography>

    {user && ( // User is signed in, display 'Generate' and 'Saved'
      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink
            to="/sequence"
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            activeClassName="highlight"
          >
            Generate
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink
            to="/save"
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            activeClassName="highlight"
          >
            Saved
          </NavLink>
        </Typography>
      </>
    )}

    {user ? ( // User is signed in, display profile and logout
      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink
            to="/profile"
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            activeClassName="highlight"
          >
            {user.username}
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <button
            onClick={handleLogout}
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
          >
            Logout
          </button>
        </Typography>
      </>
    ) : ( // User is not signed in, display sign in and sign up options
      <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink
            to="/logins"
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            activeClassName="highlight"
          >
            Sign In
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <NavLink
            to="/signin"
            className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            activeClassName="highlight"
          >
            Sign Up
          </NavLink>
        </Typography>
      </>
    )}
  </ul>
);

return (
  <>
    <Navbar className="fixed-navbar mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Yoga App
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden items-center gap-x-2 lg:flex">
          <form
            onSubmit={handleSearch}
            className="relative flex w-full gap-2 md:w-max"
          >
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              containerProps={{ className: 'min-w-[288px]' }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#2E2E2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  </>
);

}
