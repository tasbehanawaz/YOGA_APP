import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Program from './Pages/Program/program';
import Layout from './components/layout/layout';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
