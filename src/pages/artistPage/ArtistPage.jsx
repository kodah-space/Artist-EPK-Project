import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import userServices from "../../services/UserServices";

function ArtistPage() {
  let { id } = useParams();
  // console.log(id);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    userServices
      .getUserByID(1)
      .then((resp) => {
        // console.log(resp.data);
        setUserData(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [id]);

  return (
    <div className="artistPage-container">
      <h1>Artist Page</h1>
      <h2>{userData.artistName}</h2>
      <p>{userData.shoutout}</p>
      <img src={userData.imageUrl}></img>
      <p>{userData.location}</p>
      <p>{userData.bio}</p>
    </div>
  );
}

export default ArtistPage;
