import axios from 'axios';

export const checkLoginStatus = () => {
  const cookieArray = document.cookie.split(/;\s*/);
  const cookies = cookieArray.reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});

  if (cookies.user_id && cookies.username && cookies.session_token) {
    return {
      id: cookies.user_id,
      username: cookies.username,
      session_token: cookies.session_token,
    };
  }

  return null;
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/logout.php`,
      {},
      { withCredentials: true }
    );
    if (response.data.success) {
      return true;
    } else {
      throw new Error(response.data.error || 'Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
