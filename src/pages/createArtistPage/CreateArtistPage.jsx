import React, { useEffect } from "react";
import { useState } from "react";
import userServices from "../../services/UserServices";

function CreateArtistPage() {
  const [bioErrorMessage, setBioErrorMessage] = useState("");
  const [shoutoutErrorMessage, setShoutoutErrorMessage] = useState("");

  const [image, setImage] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const optionsSocial = ["Instagram", "Youtube", "Spotify", "tiktok"];
  const [selectedSocial, setSelectedSocial] = useState(optionsSocial[0]);
  const [socialsArr, setSocialsArr] = useState([]);
  const [shoutout, setShoutout] = useState("");
  const [genre, setGenre] = useState("");
  const optionsMedia = ["Youtube", "Soundcloud", "Spotify"];
  const [optionsMediaArr, setoptionsMediaArr] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [mediaArr, setMediaArr] = useState([{ mediaURL: "" }]);

  const handleImage = (e) => setImage(e.target.value);
  const handleArtistName = (e) => setArtistName(e.target.value);
  const handleBio = (e) => {
    const valueBio = e.target.value;

    if (valueBio.length <= 1200) {
      setBio(valueBio);
      setBioErrorMessage("");
    } else {
      setBioErrorMessage("Maximum character limit exceeded (1200 characters)");
    }
  };
  const handleLocation = (e) => setLocation(e.target.value);
  const handleType = (e) => setType(e.target.value);

  //Handle social Network
  const addSocial = () => {
    const newSocial = { [optionsSocial[0]]: "" };

    setSocialsArr([...socialsArr, newSocial]);
    console.log(`1.addSocial, value of the array: `, socialsArr);
  };

  const handleSocialSelection = (e, i) => {
    setSelectedSocial(e.target.value);

    // const updatedSocialsArr = [...socialsArr];
    // const updatedObject = { ...updatedSocialsArr[i] };
    // const currentKey = Object.keys(updatedObject)[0];

    // delete updatedObject[currentKey];
    // updatedObject[e.target.value] = "";
    // updatedSocialsArr[i] = updatedObject;

    // setSocialsArr(updatedSocialsArr);
    setSocialsArr((prev) => {
      prev[i] = { [e.target.value]: "" };
      return prev;
    });
  };

  const handleSocialChange = (e, i) => {
    console.log(` 3.handleSocialChange : `, socialsArr);
    // const updatedSocials = [...socialsArr];
    // updatedSocials[i] = {
    //   ...updatedSocials[i],
    //   [selectedSocial]: e.target.value,
    // };
    // setSocialsArr(updatedSocials);

    setSocialsArr((prev) => {
      prev[i] = { [Object.keys(prev[i])[0]]: e.target.value };
      return prev;
    });
    console.log(` 4.handleSocialChange : `, socialsArr);
  };

  const handleShoutout = (e) => {
    const valueShoutout = e.target.value;

    if (valueShoutout.length <= 200) {
      setShoutout(valueShoutout);
      setShoutoutErrorMessage("");
    } else {
      setShoutoutErrorMessage(
        "Maximum character limit exceeded (200 characters)"
      );
    }
  };

  const handleGenre = (e) => setGenre(e.target.value);
  const handleMedia = (e) => setMedia(e.target.value);

  //Handle media
  const addMedia = () => {
    // const newMedia = { [optionsMedia[0]]: "" };
    const newMedia = { ["mediaURL"]: "" };

    setMediaArr([...mediaArr, newMedia]);
  };

  const handleMediaSelection = (e, i) => {
    setSelectedMedia(e.target.value);

    // setoptionsMediaArr([...optionsMediaArr, e.target.value]);

    // const updatedMediaArr = [...mediaArr];
    // const updatedObject = { ...updatedMediaArr[i] };
    // const currentKey = Object.keys(updatedObject)[i];

    // delete updatedObject[currentKey];
    // updatedObject["mediaURL"] = "";
    // updatedMediaArr[i] = updatedObject;

    // setMediaArr(updatedMediaArr);

    setMediaArr((prev) => {
      prev[i] = { [e.target.value]: "" };
      return prev;
    });
  };

  const handleMediaChange = (e, i) => {
    // const updatedMedia = [...mediaArr];
    // updatedMedia[i] = {
    //   ...updatedMedia[i],
    //   // [selectedMedia]: e.target.value,
    //   ["mediaURL"]: e.target.value,
    // };
    // setMediaArr(updatedMedia);

    setMediaArr((prev) => {
      prev[i] = { [Object.keys(prev[i])[0]]: e.target.value };
      return prev;
    });
  };

  //submit the new form
  const handleSubmit = (e) => {
    e.preventDefault();

    userServices
      .createNewUser({
        artistName: artistName,
        shoutout: shoutout,
        bio: bio,
        type: type,
        imageUrl: image,
        location: location,
        genre: genre,
        socials: socialsArr,
      })
      .then((resp) => {
        const artistId = resp.data.id;
        const mediaPromises = mediaArr.map((media, index) =>
          userServices.postMediaByArtistID({
            artistId: artistId,
            // mediaType: optionsMediaArr[index],
            mediaType: Object.keys(media),
            // mediaURL: media.mediaURL,
            mediaURL: { ["mediaURL"]: media.mediaURL },
          })
        );

        // Execute all promises concurrently
        return Promise.all(mediaPromises);
      })
      .then((responses) => {
        console.log(responses);
        // Handle responses here if needed
      })
      .catch((error) => {
        console.error("Error creating new user or posting media:", error);
      });

    //reset form fields
    setImage("");
    setArtistName("");
    setBio("");
    setLocation("");
    setType("");
    setSelectedSocial("");
    setSocialsArr([{}]);
    setShoutout("");
    setGenre("");
    setSelectedMedia("");
    setMediaArr([{}]);
  };
  console.log(socialsArr);
  console.log(mediaArr);
  return (
    <div className="createArtistPage-container">
      <p>Insert your changes: </p>
      <form onSubmit={handleSubmit}>
        <div className="addArtist-labels">
          <label>
            Image:
            <input
              name="image"
              type="url"
              placeholder="Enter image"
              value={image}
              onChange={handleImage}
            />
          </label>
          <br />
          <label>
            ArtistName:
            <input
              name="artistName"
              type="text"
              placeholder="Enter Artist Name"
              value={artistName}
              onChange={handleArtistName}
            />
          </label>
          <br />
          <label>
            Bio:
            <input
              name="bio"
              type="text"
              placeholder="Enter Bio"
              value={bio}
              onChange={handleBio}
            />
          </label>
          {bioErrorMessage && <p style={{ color: "red" }}>{bioErrorMessage}</p>}
          <br />
          <label>
            Location:
            <input
              name="location"
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleLocation}
            />
          </label>
          <br />
          <label>
            Type:
            <input
              name="type"
              type="text"
              placeholder="Enter Type"
              value={`artist`}
              onChange={handleType}
              readOnly
            />
          </label>
          <br />
          <label>
            Add your Socials:
            {socialsArr.map((social, index) => {
              return (
                <div>
                  <select
                    id={`datalist-${index}`}
                    value={social.selectedSocial}
                    onChange={(e) => handleSocialSelection(e, index)}
                  >
                    {optionsSocial.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    name={selectedSocial}
                    type="url"
                    placeholder="Enter Social Network"
                    key={index}
                    value={social[selectedSocial] || ""}
                    onChange={(e) => handleSocialChange(e, index)}
                  />
                </div>
              );
            })}
            <button type="button" onClick={addSocial}>
              +
            </button>
          </label>
          <br />
          <label>
            Shoutout:
            <input
              name="shoutout"
              type="text"
              placeholder="Enter shoutout"
              value={shoutout}
              onChange={handleShoutout}
            />
          </label>
          {shoutoutErrorMessage && (
            <p style={{ color: "red" }}>{shoutoutErrorMessage}</p>
          )}
          <br />
          <label>
            Genre:
            <input
              name="genre"
              type="text"
              placeholder="Enter genre"
              value={genre}
              onChange={handleGenre}
            />
          </label>
          <br />
          <label>
            Add your Media:
            {mediaArr.map((media, mediaIndex) => {
              return (
                <div>
                  <select
                    id={`datalist-${mediaIndex}`}
                    value={media.selectedMedia}
                    onChange={(e) => handleMediaSelection(e, mediaIndex)}
                  >
                    {optionsMedia.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    name={selectedMedia}
                    type="url"
                    placeholder="Enter Media"
                    key={mediaIndex}
                    value={media[selectedMedia] || ""}
                    onChange={(e) => handleMediaChange(e, mediaIndex)}
                  />
                </div>
              );
            })}
            <button type="button" onClick={addMedia}>
              +
            </button>
          </label>
          <br />
        </div>
        <button type="submit">Create New Artist</button>
      </form>
    </div>
  );
}

export default CreateArtistPage;
