import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Adjust import path

export const useAuth = () => useContext(AuthContext);
