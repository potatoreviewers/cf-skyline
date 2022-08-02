import { useParams } from 'react-router-dom';

function UserPage() {
    const {username, year} = useParams();
    // console.log(username, year);

  return (
      <div className="UserPage">
        <h1> Hello {username} {year} </h1>
      </div>
  );
}

export default UserPage;
