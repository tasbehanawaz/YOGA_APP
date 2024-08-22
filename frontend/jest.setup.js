// jest.setup.js
import '@testing-library/jest-dom';

// Load .env variables
require('dotenv').config();

// Setting up environment variables for testing
process.env.VITE_BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8001';

// Polyfill for TextEncoder and TextDecoder, if needed
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
