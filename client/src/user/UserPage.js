import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './../NotFound'
import Loading from './../Loading'

// TODO change api url 
// in deployment
const API_URL = 'http://localhost:8081';

function UserPage() {
  const { username, year } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect((getUsername = () => username, getYear = () => year) => {
    setLoading(true);
    document.title = `${username}`;

    const yearInt = parseInt(getYear());
    if (isNaN(yearInt) || yearInt < 2010 || yearInt > new Date().getFullYear()) {
      setLoading(false);
      setError(true);
    }

    // TODO: change request path
    fetch(`${API_URL}/file/muratsat-2022.stl?handle=${getUsername()}`,
    {method: 'HEAD'})
      .then(res => {
        console.log(`${API_URL}/file/muratsat-2022.stl?handle=${getUsername()}`)
        setLoading(false);
        if (res.status === 404) {
          setError(true);
        }
      })
      .catch(err => {
        setError(true);
        setLoading(false);
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
          <h1> {username}'s activity in {year} </h1>
        </div>
      }
      </>
    }
    </>
  )

}

export default UserPage;
