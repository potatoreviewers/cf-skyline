import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './../NotFound'
import Loading from './../Loading'
import CanvasComponent from './Canvas'
import './UserPage.css';

// TODO change api url 
// in deployment
// const API_URL = 'http://localhost:8081';

function UserPage() {
  const { username, year } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect((getUsername = () => username, getYear = () => year) => {
    setLoading(true);
    document.title = `${getUsername()}`;

    const yearInt = parseInt(getYear());
    if (isNaN(yearInt) || yearInt < 2010 || yearInt > new Date().getFullYear()) {
      setLoading(false);
      setError(true);
    }

    // TODO: change request path
    fetch(`https://codeforces.com/api/user.info?handles=${getUsername()}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setLoading(false);
          
          // get year of registrationTimeSeconds
          const registrationTimeSeconds = data.result[0].registrationTimeSeconds;
          const registrationDate = new Date(registrationTimeSeconds * 1000);
          const registrationYear = registrationDate.getFullYear();
          console.log(registrationDate);

          // check selected year is not before registration year
          if (yearInt < registrationYear) {
            setError(true);
          }

        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
    {error ? 
      <NotFound /> : 
      <>
      {loading ? 
        <Loading /> : 
        <div className="Page">
          <div className="UserPage-info">
            <h1> 
              <a href={`https://codeforces.com/profile/${username}`}>{username}</a>
              's activity in {year} 
            </h1>


          </div>
          <div className="UserPage-canvas-container">
            <CanvasComponent id="UserPage-canvas"/>
          </div>
        </div>
      }
      </>
    }
    </>
  )

}

export default UserPage;
