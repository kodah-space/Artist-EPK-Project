import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import userServices from "../../services/UserServices";
import Spotify from "../../components/mediacomponents/Spotify";
import Soundcloud from "../../components/mediacomponents/SoundCloud";
import Youtube from "../../components/mediacomponents/Youtube";

function ArtistPage() {
  const { artistId } = useParams();
  console.log(artistId);
  const [userData, setUserData] = useState(null);
  const [userMediaData, setUserMediaData] = useState(null);

  useEffect(() => {
    userServices
      .getUserByID(artistId)
      .then((resp) => {
        // console.log(resp.data);
        setUserData(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [artistId]);

  useEffect(() => {
    userServices
      .getMediaByArtistID(artistId)
      .then((resp) => {
        // console.log(resp.data);
        setUserMediaData(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, [artistId]);

  if (!userData || !userMediaData) return "loading...";

  //filter based on mediatype

  const youtubeMediaList = userMediaData.filter(
    (obj) => obj.mediaType === "youtube"
  );

  const soundcloudMediaList = userMediaData.filter(
    (obj) => obj.mediaType === "soundcloud"
  );

  const spotifyMediaList = userMediaData.filter(
    (obj) => obj.mediaType === "spotify"
  );

  console.log(youtubeMediaList);
  console.log(soundcloudMediaList);
  console.log(spotifyMediaList);

  return (
    <div className="artistPage-container">
      <h1>Artist Page</h1>
      <h2>{userData.artistName}</h2>
      <p>{userData.shoutout}</p>
      <img src={userData.imageUrl}></img>
      <p>{userData.bio}</p>
      {/* <li>
        {spotifyMediaList.map((media, index) => {
          return <Spotify url={media.mediaURL} />;
          {
            console.log(media.mediaURL);
          }
        })}
      </li> */}

      {/* <li>
        {soundcloudMediaList.map((media, index) => {
          return <Soundcloud url={media.mediaURL} />;
        })}
      </li> */}

      <ul>
        {youtubeMediaList.map((media, index) => (
          <li key={index}>
            <Youtube url={media.mediaURL} />
            {console.log(media.mediaURL)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistPage;
