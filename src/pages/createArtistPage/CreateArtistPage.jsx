import React, { useEffect } from "react";
import { useState } from "react";
import userServices from "../../services/UserServices";
import useLocationSearch from "../../services/UseLocationSearch";

function CreateArtistPage() {
  const [bioErrorMessage, setBioErrorMessage] = useState("");
  const [shoutoutErrorMessage, setShoutoutErrorMessage] = useState("");
  const [queryLocation, setQueryLocation] = useState("");
  const [active, setActive] = useState(true);
  const { suggestions, clearSuggestions } = useLocationSearch(queryLocation);
  const defaultImageUrl =
    "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png";

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

  //Location methods

  const handleLocationSearch = (event) => {
    setQueryLocation(event.target.value);
    setActive(true);
  };

  const handleLocationSelect = (suggestion) => {
    setQueryLocation(suggestion.display_name);
    setActive(false);
    clearSuggestions();
  };

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
    const finalImage = image || defaultImageUrl;

    userServices
      .createNewUser({
        artistName: artistName,
        shoutout: shoutout,
        bio: bio,
        type: type,
        imageUrl: finalImage,
        location: queryLocation,
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
    <div className="">
      <h2>Your Artist Profile </h2>
      <form onSubmit={handleSubmit} className="text-left p-5">
        <div className="addArtist-labels">
          <label>
            Image:
            <br />
            <input
              name="image"
              type="url"
              placeholder="enter image-URL"
              value={image}
              onChange={handleImage}
              className=""
            />
          </label>
          <br />
          <label>
            Name:
            <br />
            <input
              name="artistName"
              type="text"
              placeholder="enter artist name"
              value={artistName}
              onChange={handleArtistName}
            />
          </label>
          <br />
          <label>
            Bio:
            <br />
            <input
              name="bio"
              type="text"
              placeholder="enter bio"
              value={bio}
              onChange={handleBio}
            />
          </label>
          {bioErrorMessage && <p style={{ color: "red" }}>{bioErrorMessage}</p>}
          <br />
          <label>
            Shoutout:
            <input
              name="shoutout"
              type="text"
              placeholder="enter a community shoutout"
              value={shoutout}
              onChange={handleShoutout}
            />
          </label>
          {shoutoutErrorMessage && (
            <p style={{ color: "red" }}>{shoutoutErrorMessage}</p>
          )}
          <br />
          <label>
            Location:
            <input
              type="text"
              value={queryLocation}
              onChange={handleLocationSearch}
              placeholder="search for location"
            />
            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </label>
          {/* <label>
            Location:
            <input
              name="location"
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleLocation}
            />
          </label> */}
          {/* <label>
            Type:
            <input
              name="type"
              type="text"
              placeholder="Enter Type"
              value={`artist`}
              onChange={handleType}
              readOnly
            />
          </label> */}
          <br />

          <label>
            Genre:
            <br />
            <input
              name="genre"
              type="text"
              placeholder="enter genres"
              value={genre}
              onChange={handleGenre}
            />
          </label>
          <br />
          <div>
            <label>
              Add Socials:
              <button
                type="button"
                onClick={addSocial}
                className="bg-transparent border rounded border-black hover:border-[#26C281] py-0.75 px-2 mx-2 text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] md:p-0 md:m-0"
              >
                add more
              </button>
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
                      placeholder="enter account url"
                      key={index}
                      value={social[selectedSocial] || ""}
                      onChange={(e) => handleSocialChange(e, index)}
                    />
                  </div>
                );
              })}
              <br />
            </label>
          </div>
          <br />

          <h2 className="px-0">Your Media</h2>
          <label>
            Add Media:
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
            <button
              type="button"
              onClick={addMedia}
              className="bg-transparent border rounded border-black hover:border-[#26C281] py-0.75 px-2 mx-2 text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] md:p-0 md:m-0"
            >
              ✚
            </button>
          </label>
          <br />
        </div>
        <button type="submit" className="btn-primary-green-bg">
          Submit Profile
        </button>
      </form>
    </div>
  );
}

export default CreateArtistPage;
