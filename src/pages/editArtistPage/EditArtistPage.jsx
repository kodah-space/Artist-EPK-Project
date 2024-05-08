import React, { useEffect } from "react";
import userServices from "../../services/UserServices";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditArtistPage() {
  const { artistId } = useParams();
  const handleInstaHandle = (e) => setInstaHandle(e.target.value);
  const handleYoutubeSocial = (e) => setYoutubeSocial(e.target.value);

  console.log(`param from the URL: `, artistId);

  const [artistInfo, setArtistInfo] = useState({
    imageUrl: "",
    artistName: "",
    bio: "",
    location: "",
    type: "",
    socials: [{}],
    shoutout: "",
    genre: "",
  });

  const [mediaInfo, setMediaInfo] = useState([]);

  useEffect(() => {
    fetchArtistInfo(artistId);
    fetchMedia(artistId);
  }, [artistId]);

  const fetchArtistInfo = (artistId) => {
    userServices
      .getUserByID(artistId)
      .then((resp) => {
        setArtistInfo(resp.data);
      })
      .then((resp) => {
        // const socials = resp.data.socials;

        const socials = resp.data.socials;
      })
      .catch((error) => {
        console.error("Error fetching artist information:", error);
      });
  };

  const fetchMedia = (artistId) => {
    userServices
      .getMediaByArtistID(artistId)
      .then((resp) => {
        setMediaInfo(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching media:", error);
      });
  };

  const [bioErrorMessage, setBioErrorMessage] = useState("");
  const [shoutoutErrorMessage, setShoutoutErrorMessage] = useState("");
  const optionsSocial = ["Instagram", "Youtube", "Spotify", "tiktok"];
  const optionsMedia = ["Youtube", "Soundcloud", "Spotify"];

  const handleArtistName = (e) => {
    setArtistInfo({ ...artistInfo, artistName: e.target.value });
  };

  const handleImage = (e) => {
    setArtistInfo({ ...artistInfo, image: e.target.value });
  };

  const handleLocation = (e) => {
    setArtistInfo({ ...artistInfo, location: e.target.value });
  };

  const handleBio = (e) => {
    const valueBio = e.target.value;
    if (valueBio.length <= 1200) {
      setArtistInfo({ ...artistInfo, bio: valueBio });
      setBioErrorMessage("");
    } else {
      setBioErrorMessage("Maximum character limit exceeded (1200 characters)");
    }
  };

  const handleType = (e) => {
    setArtistInfo({ ...artistInfo, type: e.target.value });
  };

  const handleShoutout = (e) => {
    const valueShoutout = e.target.value;

    if (valueShoutout.length <= 200) {
      setArtistInfo({ ...artistInfo, shoutout: valueShoutout });
      setShoutoutErrorMessage("");
    } else {
      setShoutoutErrorMessage(
        "Maximum character limit exceeded (200 characters)"
      );
    }
  };

  const handleGenre = (e) => {
    setArtistInfo({ ...artistInfo, genre: e.target.value });
  };

  const handleMediaChange = (e) => {
    setArtistInfo({ ...artistInfo, mediaArr: e.target.value });
  };

  const handleMediaTypeChange = (e, index) => {
    const newMediaInfo = [...mediaInfo];
    newMediaInfo[index].mediaType = e.target.value;
    setMediaInfo(newMediaInfo);
  };

  const handleMediaURLChange = (e, index) => {
    const newMediaInfo = [...mediaInfo];
    newMediaInfo[index].mediaURL = e.target.value;
    setMediaInfo(newMediaInfo);
  };

  const addMedia = () => {
    const newMedia = { mediaType: optionsMedia[0], mediaURL: "" };
    setMediaInfo([...mediaInfo, newMedia]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // First, update the user information
    userServices
      .updateUserByID(artistId, artistInfo)
      .then((userResp) => {
        console.log("Artist information updated successfully:", userResp);

        // After the user information is successfully updated, update the media information
        return userServices.updateMediaByArtistID(artistId, mediaInfo);
      })
      .then((mediaResp) => {
        console.log("Media information updated successfully:", mediaResp);
      })
      .catch((error) => {
        console.error("Error updating artist information:", error);
      });
  };

  return (
    <div className="modifyArtistPage-container p-5 text-left">
      <h2 className="px-0">Edit Artist Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="py-2.5">
          <label>
            Image:
            <input
              type="url"
              value={artistInfo.imageUrl}
              onChange={handleImage}
            />
          </label>
        </div>
        <div className="py-2.5">
          <label>
            Name:
            <textarea
              type="text"
              value={artistInfo.artistName}
              onChange={handleArtistName}
            />
          </label>
        </div>
        <div className="py-2.5">
          <label>
            Bio:
            <textarea type="text" value={artistInfo.bio} onChange={handleBio} />
            {bioErrorMessage && (
              <p style={{ color: "red" }}>{bioErrorMessage}</p>
            )}
          </label>
        </div>

        <div className="py-2.5">
          <label>
            Shoutout:
            <textarea
              type="text"
              value={artistInfo.shoutout}
              onChange={handleShoutout}
            />
            {shoutoutErrorMessage && (
              <p style={{ color: "red" }}>{shoutoutErrorMessage}</p>
            )}
          </label>
        </div>
        <div className="py-2.5">
          <label>
            Location:
            <input
              type="text"
              value={artistInfo.location}
              onChange={handleLocation}
            />
          </label>
        </div>
        <div className="py-2.5">
          <label>
            Genre:
            <input
              type="text"
              value={artistInfo.genre}
              onChange={handleGenre}
            />
          </label>
        </div>
        {/* <label>
          Type:
          <input
            type="text"
            value={artistInfo.type}
            onChange={handleType}
            readOnly
          />
        </label> */}
        <div className="py-2.5">
          <h2 className="pl-0">Your Socials</h2>
          <div className="py-2.5">
            <label>
              Instagram Url :
              <input
                type="text"
                value={artistInfo.socials.instagramUrl}
                onChange={handleInstaHandle}
              />
            </label>
          </div>
          <div className="py-2.5">
            <label>
              Youtube Url :
              <input
                type="text"
                value={artistInfo.socials.youtubeUrl}
                onChange={handleInstaHandle}
              />
            </label>
          </div>
        </div>

        <div className="py-1.5 my-5">
          <label>
            <h2 className="px-0">Your Media</h2>
            {mediaInfo.map((media, index) => (
              <div key={index}>
                <select
                  value={media.mediaType}
                  onChange={(e) => handleMediaTypeChange(e, index)}
                >
                  {optionsMedia.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  value={media.mediaURL}
                  onChange={(e) => handleMediaURLChange(e, index)}
                />
              </div>
            ))}
            <div className="pt-5">
              <button
                type="button"
                onClick={addMedia}
                className="btn-primary m-0 py-1.5"
              >
                Add more
              </button>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary-green-bg justify-center mt-10 m-auto"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditArtistPage;
