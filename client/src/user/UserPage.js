import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './../NotFound'

function UserPage() {
    const {username, year} = useParams();

    const [found, setFound] = useState(true);

    useEffect(
      () => {
        const yearInt = parseInt(year);
        if (isNaN(yearInt) || yearInt < 2010 || yearInt > new Date().getFullYear()) {
          setFound(false);
          return;
        }

        fetch(`https://codeforces.com/api/user.info?handles=${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'FAILED') {
              setFound(false);
            }
          }
        );
      }, 
      [username, year]
    );



  return found? (
      <div className="UserPage">
        <h1> Codeforces skylines </h1>
        {username}
      </div>
  ) : NotFound();

}

export default UserPage;
