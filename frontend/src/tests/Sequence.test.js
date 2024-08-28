// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sequence from '../Pages/sequence/sequence';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import jest from '@testing-library/jest-dom';


// Mock localStorage
const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
      removeItem: function(key) {
        delete store[key];
      }
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });



// Mock Axios
jest.mock('axios');

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Sequence Component', () => {
    beforeEach(() => {
        axios.get.mockReset();
        axios.post.mockReset();
        jest.spyOn(localStorage, 'getItem');
        jest.spyOn(localStorage, 'setItem');
        jest.spyOn(localStorage, 'clear');
        jest.spyOn(localStorage, 'removeItem');
        localStorage.clear();
      });


  //Test case 1
  // Test case for loading poses
  test('should load poses based on difficulty levels', async () => {
    const mockPoses = [
      {
        english_name: 'Mountain Pose',
        pose_description: 'A basic standing pose.',
        url_png: 'mountain.png',
        pose_benefits: 'Improves posture and balance.',
        difficulty_level: 'Beginner',
      },
      {
        english_name: 'Warrior Pose',
        pose_description: 'A strong and powerful pose.',
        url_png: 'warrior.png',
        pose_benefits: 'Strengthens the legs and core.',
        difficulty_level: 'Intermediate',
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { status: 'success', data: mockPoses },
    });

    render(
      <MemoryRouter>
        <Sequence />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Mountain Pose')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Warrior Pose')).toBeInTheDocument());

    // Find the select element by test id and change its value
    fireEvent.change(screen.getByTestId('difficulty-level-select'), {
        target: { value: 'Intermediate' },
      });
  
      axios.post.mockResolvedValueOnce({
        data: { status: 'success', data: [mockPoses[1]] },
      });
  
      fireEvent.click(screen.getByText('Apply Filters'));
  
      // Check if the poses are filtered correctly
      await waitFor(() => expect(screen.getByText('Warrior Pose')).toBeInTheDocument());
      expect(screen.queryByText('Mountain Pose')).not.toBeInTheDocument();
    });


  //Test case 2
// Test case for generating video
test('should generate a video with selected poses', async () => {
    const mockPoses = [
      {
        english_name: 'Mountain Pose',
        pose_description: 'A basic standing pose.',
        url_png: 'mountain.png',
        pose_benefits: 'Improves posture and balance.',
        difficulty_level: 'Beginner',
      },
    ];
  
    axios.get.mockResolvedValueOnce({
      data: { status: 'success', data: mockPoses },
    });
  
    render(
      <MemoryRouter>
        <Sequence />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(screen.getByText('Mountain Pose')).toBeInTheDocument());
  
    fireEvent.click(screen.getByText('Mountain Pose'));
    fireEvent.click(screen.getByText('Generate Video'));
  
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('generatedVideos', expect.any(String));
    expect(screen.getByText('Generate Video')).toBeInTheDocument();
  });
});
