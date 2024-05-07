import React, { useEffect } from "react";
import userServices from "../../services/UserServices";
import { useState } from "react";

function EditArtistPage() {
  const artistId = 1;
  const [artistInfo, setArtistInfo] = useState({
    imageUrl: "",
    artistName: "",
    bio: "",
    location: "",
    type: "",
    socials: [{}],
    shoutout: "",
    genre: "",
    mediaArr: [{}],
  });

  const [socialsArr, setSocialsArr] = useState([]);

  useEffect(() => {
    fetchArtistInfo(artistId);

    // console.log(`after fetching my artist: `, artistInfo);
    console.log(`after fetching social array: `, socialsArr);
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

  const handleMediaSelection = (e) => {
    // setArtistInfo({ ...artistInfo, mediaArr: e.target.value });
  };

  const handleMediaChange = (e) => {
    setArtistInfo({ ...artistInfo, mediaArr: e.target.value });
  };

  const addMedia = () => {
    const newMedia = { [optionsMedia[0]]: "" };

    setArtistInfo({
      ...artistInfo,
      mediaArr: [...artistInfo.mediaArr, newMedia],
    });
  };

  // Similar handleChange functions for other fields

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to update artist information
    userServices
      .updateArtistInfo(artistId, artistInfo)
      .then((resp) => {
        console.log("Artist information updated successfully:", resp);
        // Optionally, show a success message or redirect to another page
      })
      .catch((error) => {
        console.error("Error updating artist information:", error);
        // Optionally, show an error message to the user
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
        <label>
          Type:
          <input
            type="text"
            value={artistInfo.type}
            onChange={handleType}
            readOnly
          />
        </label>
        <br />
        <label>
          Add your Socials:
          {/* {socialsArr.map((social, index) => {
            return (
              <div key={index}>
                <select
                  value={Object.keys(social)}
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
                  value={social}
                  onChange={(e) => handleSocialChange(e, index)}
                />
              </div>
            );
          })} */}
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
                value={artistInfo.socials[socialKey]} // Access the value using the key
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
          {/* {artistInfo.mediaArr.map((media, index) => (
            <div key={index}>
              <select
                value={Object.keys(media)[0]}
                onChange={(e) => handleMediaSelection(e, index)}
              >
                {optionsMedia.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={Object.values(media)[0]}
                onChange={(e) => handleMediaChange(e, index)}
              />
            </div>
          ))} */}
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
