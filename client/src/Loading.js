import { useNavigate } from 'react-router-dom'

function Loading() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
      <div className="Page">
        <div id ="Loading-content">
          <h1> Loading... </h1>
          <button onClick={handleClick}>Go to home page</button>
        </div>
      </div>
  );
}

export default Loading;
