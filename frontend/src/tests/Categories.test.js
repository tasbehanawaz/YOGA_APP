import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import Categories from '../Pages/categories/categories';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';




// Mock Axios
jest.mock('axios');

// Set up environment variable mock
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

process.env.VITE_BACKEND_URL = 'http://localhost:8001';  // Ensure the env variable is set for the test

// Mock environment variable
global.import = {
  meta: {
    env: {
      VITE_BACKEND_URL: 'http://localhost:8001',
    },
  },
};

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Categories Component', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test('should call handleSavePose when the save button is clicked', async () => {
    const mockPoses = [
      {
        english_name: 'Warrior Pose',
        pose_description: 'A strong and powerful pose.',
        url_png: 'warrior.png',
        pose_benefits: 'Strengthens the legs and core',
        difficulty_level: 'intermediate',
      },
    ];

    // Mock the initial pose fetch
    axios.post.mockResolvedValueOnce({
      data: { status: 'success', data: mockPoses },
    });

    // Mock the save operation
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      render(
        <MemoryRouter>
          <Categories />
        </MemoryRouter>
      );
    });

    // Wait for poses to be fetched and displayed
    await waitFor(() => expect(screen.getByText('Found 1 results')).toBeInTheDocument());

    // Trigger Save Pose button click
    const saveButton = screen.getByText('Save Pose');
    fireEvent.click(saveButton);

    // Ensure the save API call was made with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenLastCalledWith(
        'http://localhost:8001/save_pose.php',
        {
          english_name: mockPoses[0].english_name,
          pose_description: mockPoses[0].pose_description,
          url_png: mockPoses[0].url_png,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });
});
