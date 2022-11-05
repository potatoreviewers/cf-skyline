import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./../NotFound";
import Loading from "./../Loading";
import CanvasComponent from "./scene/Canvas";
import "./UserPage.css";


function UserPage() {
  const { username, year } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let activity_data = useRef;

  useEffect((getUsername = () => username, getYear = () => year) => {
    setLoading(true);
    document.title = `${getUsername()}`;

    const yearInt = parseInt(getYear());
    if (
      isNaN(yearInt) ||
      yearInt < 2010 ||
      yearInt > new Date().getFullYear()
    ) {
      setLoading(false);
      setError(true);
    }

    const url = 'https://codeforces.com/api/user.status?handle=' + username
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "OK") {
          setError(true);
        }
        activity_data.current = data;
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error ?
        (<NotFound />) :
        (<>
          {loading ?
            (<Loading />) :
            (<div className="Page">
              <div className="UserPage-info">
                <h1>
                  <a href={`https://codeforces.com/profile/${username}`}>
                    {username}
                  </a>
                  's activity in {year}
                </h1>
              </div>
              <div className="UserPage-canvas-container">
                <CanvasComponent id="UserPage-canvas" data={activity_data.current} username={username} year={year} />
              </div>
            </div>
            )
          }
        </>)
      }
    </>
  );
}

export default UserPage;
