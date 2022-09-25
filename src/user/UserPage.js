import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./../NotFound";
import Loading from "./../Loading";
import CanvasComponent from "./Canvas";
import "./UserPage.css";

// TODO change api url
// in deployment
const API_URL = "http://localhost:8080";

function UserPage() {
  const { username, year } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [stlUrl, setStlUrl] = useState(`${API_URL}/stl/notfound.stl`);

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

    // TODO: change request path
    fetch(`${API_URL}/stl`, {
      method: "POST",
      body: JSON.stringify({ username: getUsername(), year: getYear() }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setStlUrl(API_URL + data.stl_link);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="Page">
              <div className="UserPage-info">
                <h1>
                  <a href={`https://codeforces.com/profile/${username}`}>
                    {username}
                  </a>
                  's activity in {year}
                </h1>
              </div>
              <div className="UserPage-canvas-container">
                <CanvasComponent id="UserPage-canvas" url={stlUrl} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default UserPage;
