import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import userServices from "../../services/UserServices";

function ArtistPage() {
  const { artistId } = useParams();
  console.log(artistId);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    userServices
      .getUserByID(1)
      .then((resp) => {
        console.log(resp.data);
        setUserData(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [artistId]);
  if (!userData) return "loading...";
  return (
    <div className="artistPage-container">
      <h1>Artist Page</h1>
      <h2>{userData.artistName}</h2>
      <p>{userData.shoutout}</p>
      <img src={userData.imageUrl}></img>
      <p>{userData.bio}</p>
    </div>
  );
}

export default ArtistPage;
