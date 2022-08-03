import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
    const {username, year} = useParams();

    const [message, setMessage] = useState('');
    const [userpic, setUserpic] = useState();

    useEffect(
      () => {
        fetch(`https://codeforces.com/api/user.info?handles=${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'FAILED') {
              setMessage(data.comment);
            }
            else {
              setUserpic(data.result[0].titlePhoto);
              setMessage(`${username}'s activity in ${year}`);
            }
          }
        );
      }, 
      [username, userpic, year]
    );



  return (
      <div className="UserPage">
        <h1> Codeforces skylines </h1>
        {userpic && <img src={userpic} alt="userpic" id="userpic" />}
        <p> {message} </p>
      </div>
  );
}

export default UserPage;
