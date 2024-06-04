import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Program from './Pages/Program/program';
import Layout from './components/layout/layout';
import Categories from './Pages/categories/categories';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
