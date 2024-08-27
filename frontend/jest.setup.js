import '@testing-library/jest-dom';
import { config } from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';

// Load .env file
config();  // This loads the .env file, equivalent to require('dotenv').config()

// import { process } from 'node';

// // Set the VITE_BACKEND_URL environment variable if not already set
// process.env.VITE_BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8001';

// Polyfill for TextEncoder and TextDecoder
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
