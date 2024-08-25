import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth';
import { Navbar, Typography, Button, Input } from '@material-tailwind/react';
import './navbar.css';

export function NavbarWithSearch() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          onClick={closeMenu}
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
          onClick={closeMenu}
        >
          Categories
        </NavLink>
      </Typography>

      {user && (
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
              onClick={closeMenu}
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
              onClick={closeMenu}
            >
              Saved
            </NavLink>
          </Typography>
        </>
      )}

      {user ? (
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
              onClick={closeMenu}
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
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
            >
              Logout
            </button>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <NavLink
              to="/login"
              className="flex items-center hover:bg-blue-500 hover:text-white hover:py-2 hover:px-4"
              activeClassName="highlight"
              onClick={closeMenu}
            >
              Sign Up
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
              onClick={closeMenu}
            >
              Sign In
            </NavLink>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="fixed-navbar mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 z-10">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Yoga App
        </Typography>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-blue-gray-900">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex items-center">
          {navList}
          <div className="ml-4">
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          {navList}
          <div className="mt-4">
            <form
              onSubmit={(e) => {
                handleSearch(e);
                closeMenu();
              }}
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </Navbar>
  );
}
