import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'; // Add this line to import PropTypes

const AuthContext = createContext();

const checkLoginStatus = () => {
    const cookieArray = document.cookie.split(/;\s*/);
    console.log('CookieArray:', cookieArray);
    const cookies = cookieArray.reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});

    

    if (cookies.user_id && cookies.username && cookies.session_token) {
        return { id: cookies.user_id, username: cookies.username, session_token: cookies.session_token};
    }

    return null;
};


export const AuthProvider = ({ children }) => {
  // Add prop type validation for 'children'
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [user, setUser] = useState(checkLoginStatus());

  useEffect(() => {
    // Check login status on mount and periodically if needed
    const user = checkLoginStatus();
    if (user) setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);