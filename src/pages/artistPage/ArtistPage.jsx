import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userServices from "../../services/UserServices";
import Spotify from "../../components/mediacomponents/Spotify";
import Soundcloud from "../../components/mediacomponents/SoundCloud";
import Youtube from "../../components/mediacomponents/Youtube";
import { Link } from "react-router-dom";

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
    <div className="artistPage-container p-2.5 md:p-5">
      <h2 className="pb-1">{userData.artistName}</h2>
      <div className="text-left px-5">
        <p className="text-grey-darker text-sm">› {userData.location}</p>
      </div>
      <div>
        <div className="flex flex-col items-center p-3">
          <div className="flex flex-col items-center md:flex-row-reverse ">
            <div className="pb-2 md: flex flex-col items center">
              <p>↓</p>
              <p>{userData.shoutout}</p>
              <p>↑</p>
            </div>
            <img
              src={userData.imageUrl}
              alt="artist image"
              className="md:place-items-start p-3"
            />
          </div>
        </div>
        <p className="font-[Linux-Libertine] text-lg p-5 md:p-5">
          {userData.bio}
        </p>

        <h3 className="text-start pb-10">Media</h3>
        <div className="flex flex-col items-center list-none">
          <li>
            {spotifyMediaList.map((media, index) => {
              return <Spotify url={media.mediaURL} />;
              {
                console.log(media.mediaURL);
              }
            })}
          </li>

          <ul className="">
            {youtubeMediaList.map((media, index) => (
              <li key={index} className="py-5">
                <Youtube url={media.mediaURL} />
                {console.log(media.mediaURL)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <li>
        {soundcloudMediaList.map((media, index) => {
          return <Soundcloud url={media.mediaURL} />;
        })}
      </li> */}
      <Link to="/artist/:artistId/edit" className="btn-primary-green-bg">
        Edit Profile
      </Link>
    </div>
  );
}

export default ArtistPage;
