import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

const checkLoginStatus = () => {
  const cookieArray = document.cookie.split(/;\s*/);
  const cookies = cookieArray.reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});

  if (cookies.user_id && cookies.username && cookies.session_token) {
    return { id: cookies.user_id, username: cookies.username, session_token: cookies.session_token };
  }

  return null;
};

const logoutUser = async () => {
  try {
    const response = await fetch('/signout.php', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      throw new Error(data.error || 'Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(checkLoginStatus());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8001/get_user.php', { withCredentials: true });
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

  const logout = async () => {
    const success = await logoutUser();
    if (success) {
      setUser(null);
    }
    return success;
  };

  return (
    <AuthContext.Provider value={{ user, checkLoginStatus, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};



AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);