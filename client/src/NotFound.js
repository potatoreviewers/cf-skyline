import { useNavigate } from 'react-router-dom'

function NotFound() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
      <div className="Page">
        <div id ="notfound-content">
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>The page you are looking for does not exist.</p>
          <button onClick={handleClick}>Go to home page</button>
        </div>
      </div>
  );
}

export default NotFound;
