import './HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePageForm() {
    const currentYear = new Date().getFullYear();
    // username is codeforces handle
    const [username, setUsername] = useState('');
    // year is wanted year of activity(from 2010 to now)
    const [year, setYear] = useState(currentYear);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '') {
            
            document.getElementById('HomePageForm').appendChild(document.createTextNode('Please enter your Codeforces handle'));

            return;
        }

        navigate(`/${username}/${year}`);
    }

    return (
        <div className="HomePageForm" id="HomePageForm">
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="codeforces handle"/>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    {Array.from(Array(currentYear- 2010 + 1).keys()).map(i => <option key={i + 2010} value={i + 2010}>{i + 2010}</option>)}
                </select>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

function HomePage() {


  return (
      <div className="HomePage">
        <div className="HomePage-main">
            <div className="HomePage-main-form">
                <h1> Your Codeforces activity story in 3D</h1>
                <p> View a 3d model of your Codeforces activity graph</p> 
                <HomePageForm />
            </div>
        </div>
      </div>
  );
}

export default HomePage;
