import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userServices from "../../services/UserServices";
import Spotify from "../../components/mediacomponents/Spotify";
import Youtube from "../../components/mediacomponents/Youtube";
import { Link } from "react-router-dom";

function ArtistPage() {
  const { artistId } = useParams();
  console.log(artistId);
  const [userData, setUserData] = useState(null);
  const [userMediaData, setUserMediaData] = useState(null);
  const [socialsArr, setSocialsArr] = useState([]);

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

  // useEffect(() => {
  //   userServices
  //     .getSocials(artistId)
  //     .then((resp) => {
  //       setSocialsArr(resp.data);
  //     })
  //     .catch((error) => console.error("Failed to fetch socials:", error));
  // }, []);

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
              <div className="pb-0 pt-3 md:pt-7">
                {userData.genre.map((e) => {
                  return (
                    <p className="style-none inline-flex flex-row flex-wrap items-center text-center text-xs text-white bg-[#26C281] border rounded-xl py-0.75 px-1.5 mb-5 mx-1">
                      {e}
                    </p>
                  );
                })}
              </div>
              {/* ADD Socials */}
              <div className="flex flex-col items-center p-3r">
                {userData.socials.instagramUrl && (
                  <a
                    href={userData.socials.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      style={{ width: "32px", height: "32px" }} // Adjust as needed
                    />
                  </a>
                )}
                {userData.socials.spotifyUrl && (
                  <a
                    href={userData.socials.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Spotify"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                      alt="Spotify"
                      style={{ width: "32px", height: "32px" }} // Adjust as needed
                    />
                  </a>
                )}
              </div>
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
              if (media.mediaURL) {
                return (
                  <div key={index}>
                    <Spotify url={media.mediaURL} />
                    {console.log(media.mediaURL)}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </li>

          <ul className="">
            {youtubeMediaList.map((media, index) => {
              if (media.mediaURL) {
                return (
                  <li key={index} className="py-5">
                    <Youtube url={media.mediaURL} />
                    {console.log(media.mediaURL)}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>

      <Link
        to={`/artists/edit/${userData.id}`}
        className="btn-primary-green-bg"
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default ArtistPage;
