import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const data = location.state; // This is the state passed during navigation

  return (
    <div>
      <h1>Hii</h1>
      {data}
    </div>
  );
};

export default Result;
