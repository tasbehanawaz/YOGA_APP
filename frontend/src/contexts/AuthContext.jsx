import { createContext, useState, useEffect } from 'react';
import { checkLoginStatus, logoutUser } from '../components/utils/authutils';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(checkLoginStatus());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get_user.php`,
          {
            withCredentials: true,
          }
        );
        if (response.data.id) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signin.php`,
      credentials,
      { withCredentials: true }
    );
    setUser(response.data.user);
  };

  const logout = async () => {
    const success = await logoutUser();
    if (success) {
      setUser(null);
    }
    return success;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? (
        <div className="inset-0 flex items-center justify-center min-h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
