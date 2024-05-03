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
  const [selectedSocial, setSelectedSocial] = useState("");
  const [socialsArr, setSocialsArr] = useState([{}]);
  const [shoutout, setShoutout] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [mediaArr, setMediaArr] = useState([{}]);

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
    setSocialsArr([...socialsArr, { [selectedSocial]: "" }]);
    console.log(`this the selection array` + socialsArr);
  };

  const handleSocialChange = (e, i) => {
    const updatedSocials = [...socialsArr];
    updatedSocials[i] = {
      ...updatedSocials[i],
      [selectedSocial]: e.target.value,
    };
    setSocialsArr(updatedSocials);
  };

  const optionsSocial = ["Instagram", "Youtube", "Spotify", "tiktok"];
  const handleSocialSelection = (e) => {
    setSelectedSocial(e.target.value);
  };

  const handleShoutout = (e) => {
    const valueShoutout = e.target.value;
    console.log(`validation of the shoutout: ` + valueShoutout);
    console.log(`validation lenght: ` + valueShoutout.length);

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
    setMediaArr([...mediaArr, {}]);
  };

  const handleMediaChange = (e, i) => {
    const updatedMedia = [...mediaArr];
    updatedMedia[i] = {
      ...updatedMedia[i],
      [selectedMedia]: e.target.value,
    };
    setMediaArr(updatedMedia);
  };

  const optionsMedia = ["Youtube", "Soundcloud", "Spotify"];
  const handleMediaSelection = (e) => {
    setSelectedMedia(e.target.value);
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
        return userServices.postMediaByArtistID({
          artistId: resp.data.id,
          mediaType: selectedMedia,
          mediaURL: mediaArr,
        });
      })
      .then((resp) => console.log(resp));

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

    //Redirect to another page??
    //navigate("/ProductList");
  };
  console.log(socialsArr);
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
                    value={selectedSocial}
                    onChange={handleSocialSelection}
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
                    value={selectedMedia}
                    onChange={handleMediaSelection}
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
