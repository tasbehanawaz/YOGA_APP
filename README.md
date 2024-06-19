# A Yoga Sequencer App - University Project

This project is a full-stack application designed to support the creation and management of yoga sequences. It allows users to explore yoga poses, create sequences, and dynamically monitor sessions.

## Project Description

This is a group project by Justice Unanka Eke, Tasbeha Nawaz, Sarah Peters which is divided into: UX design, Frontend and Backend.

## Project Structure

The project is divided into two main parts:

1. `frontend/`: This is where the React application lives. It's built with Vite and uses Material Tailwind for UI components. The main entry point is `src/main.jsx`.

2. `backend/`: This is the PHP backend of the application. It includes several scripts for handling different aspects of the application, such as fetching all yoga poses (`FetchAllYogaPoses.php`), fetching a specific yoga pose by name (`FetchYogaPoses.php`), and more.

## Installation

- Clone this repo and navigate to root directory
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
