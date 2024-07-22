// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Layout from './components/layout/layout';
import Register from './Pages/login/logins'; // Correct default import
import Result from './Pages/result/result';
import SignIn from './components/signIn/signIn';
import Sequence from './Pages/sequence/sequence';
import Profile from './Pages/profile/profile';
import Save from './Pages/saved/savedPoses';
import Generate from './Pages/Generate/generate';
import About from './Pages/about/about.jsx';
import {AuthProvider} from './contexts/AuthContext';
// import Welcome from './Pages/welcome/welcome';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route 
        path="/"
         element={
         <Layout>
          <Welcome />
         </Layout>
         }
          /> */}
        {/* Welcome page route
        <Route path="/welcome" element={<Welcome />} /> */}

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/Generate"
          element={
            <Layout>
              <Generate />
            </Layout>
          }
        />

        <Route
          path="/logins"
          element={
            <Layout>
              <Register />
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

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
