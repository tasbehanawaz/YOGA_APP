// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Program from './Pages/Program/program';
import Layout from './components/layout/layout';
import Categories from './Pages/categories/categories';
import Login from './Pages/login/logins';
import Result from './Pages/result/result';
import SignIn from './components/signIn/signIn';
// import ButtonWithLink from './components/ButtonWithLink'; // Ensure this file exists
import Sequence from './Pages/sequence/sequence'; // Import the Sequence component
import Profile from './Pages/profile/profile';
import Save from './Pages/saved/savedPoses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Program />
            </Layout>
          }
        />

        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/logins"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Result />
            </Layout>
          }
          />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/sequence"
          element={
            <Layout>
              <Sequence />
            </Layout>
          }
        />
        <Route
          path="/save"
          element={
            <Layout>
              <Save />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
