import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Program from './Pages/Program/program';
import Layout from './components/layout/layout';
import Categories from './Pages/categories/categories';
import Login from './Pages/login/logins';
import Result from './Pages/result/result';

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
          path="/search"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
