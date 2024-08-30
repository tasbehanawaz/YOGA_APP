# A Yoga Sequence generator App - University Project

## Useful Links
[Frontend Deployment](https://yogaposesapp.netlify.app/)

[Backend Deployment](https://yogaapp-backend-php.appspot.com/)

git clone https://github.com/tasbehanawaz/YOGA_APP.git

This project is a full-stack application designed to support the creation and management of yoga sequences. It allows users to explore yoga poses, create sequences, and dynamically monitor sessions.

## Project Description

This is a group project by Justice Unanka Eke, Tasbeha Nawaz, and Sarah Peters which is divided into UX design, Frontend, Backend and Deployment

## Project Structure

The project is divided into two main parts:

1. `frontend/`: This is where the React application lives. It's built with Vite and uses Material Tailwind for UI components. The main entry point is `src/main.jsx`.

2. `backend/`: This is the PHP backend of the application. It includes several scripts for handling different aspects of the application, such as fetching all yoga poses (`FetchAllYogaPoses.php`), fetching a specific yoga pose by name (`FetchYogaPoses.php`), and more.

## Features

- Allows users registration to the smart accessible Yoga App
- Display the list of all the available yoga poses with descriptions and images
- Allow users to select yoga poses and automatically generate yoga session

  
### Available Yoga Poses

![All Yoga Poses](demo/All%20Yoga%20poses.png)

### Automated Yoga session

- Users can select multiple yoga poses based on preferences applied or use the random selection and generate a video

<video width="600" controls>
  <source src="demo/output.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Installation

- Clone this repo and navigate to the root directory
- Terminal: `cd Yoga_App`

### Frontend

Navigate to the `frontend/` directory and run:

```sh
npm install
npm run dev
```

### Backend

Navigate to the `Yoga_App/` directory and run:
`php -S localhost:8001 -t backend`

## Technologies:

- React
- PHP
- SQL
