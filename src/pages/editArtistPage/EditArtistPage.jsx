import React, { useEffect } from "react";
import userServices from "../../services/UserServices";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditArtistPage() {
  const { artistId } = useParams();

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

  const [socialsArr, setSocialsArr] = useState([]);

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
        for (const key in socials) {
          const newSocial = { [key]: socials[key] };
          setSocialsArr([...socialsArr, newSocial]);
        }
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

  //Location methods

  // const handleSearch = (event) => {
  //   setQueryLocation(event.target.value);
  //   setActive(true);
  // };

  // const handleSelect = (suggestion) => {
  //   setQueryLocation(suggestion.display_name);
  //   setActive(false);
  //   clearSuggestions();
  // };

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

  const handleSocialSelection = (e) => {
    setArtistInfo({ ...artistInfo, socialsArr: e.target.value });
  };

  const handleSocialChange = (e) => {
    setArtistInfo({ ...artistInfo, socialsArr: e.target.value });
  };

  const addSocial = () => {
    const newSocial = { [optionsSocial[0]]: "" };

    setArtistInfo({
      ...artistInfo,
      socialsArr: [...artistInfo.socialsArr, newSocial],
    });
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
    <div className="modifyArtistPage-container">
      <p>Modify Artist Information:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Image:
          <input
            type="url"
            value={artistInfo.imageUrl}
            onChange={handleImage}
          />
        </label>
        <br />
        <label>
          Artist Name:
          <input
            type="text"
            value={artistInfo.artistName}
            onChange={handleArtistName}
          />
        </label>
        <br />
        <label>
          Bio:
          <input type="text" value={artistInfo.bio} onChange={handleBio} />
          {bioErrorMessage && <p style={{ color: "red" }}>{bioErrorMessage}</p>}
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={artistInfo.location}
            onChange={handleLocation}
          />
        </label>
        <br />
        {/* <label>
          Type:
          <input
            type="text"
            value={artistInfo.type}
            onChange={handleType}
            readOnly
          />
        </label>
        <br /> */}
        <label>
          Add your Socials:
          {Object.keys(artistInfo.socials).map((socialKey, index) => (
            <div key={index}>
              <select
                value={socialKey}
                onChange={(e) => handleSocialSelection(e, index)}
              >
                {optionsSocial.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={artistInfo.socials[socialKey]}
                onChange={(e) => handleSocialChange(e, index)}
              />
            </div>
          ))}
          <button type="button" onClick={addSocial}>
            +
          </button>
        </label>
        <br />
        <label>
          Shoutout:
          <input
            type="text"
            value={artistInfo.shoutout}
            onChange={handleShoutout}
          />
          {shoutoutErrorMessage && (
            <p style={{ color: "red" }}>{shoutoutErrorMessage}</p>
          )}
        </label>
        <br />
        <label>
          Genre:
          <input type="text" value={artistInfo.genre} onChange={handleGenre} />
        </label>
        <br />
        <label>
          Add your Media:
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
          <button type="button" onClick={addMedia}>
            +
          </button>
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditArtistPage;
