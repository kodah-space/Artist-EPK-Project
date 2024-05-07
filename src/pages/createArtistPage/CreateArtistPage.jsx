import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  // State to manage the input and the list of genres
  const [genreInput, setGenreInput] = useState("");
  const [genres, setGenres] = useState([]);
  const optionsMedia = ["select Option", "youtube", "spotify"];
  const [successMessage, setSuccessMessage] = useState("");
  const [newArtistId, setNewArtistId] = useState(null); // New artist ID state
  const navigate = useNavigate();
  const [mediaArr, setMediaArr] = useState([{ mediaType: "", mediaURL: "" }]);

  console.log(mediaArr);

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

  const handleGenreInputChange = (e) => setGenreInput(e.target.value);

  // Add the current input value to the genres list when Enter is pressed
  const handleGenreKeyDown = (e) => {
    if (e.key === "Enter" && genreInput.trim()) {
      e.preventDefault();
      const newGenre = genreInput.trim().toLowerCase();
      const isDuplicate = genres.some(
        (genre) => genre.toLowerCase() === newGenre
      );
      if (!isDuplicate) {
        setGenres((prevGenres) => [...prevGenres, genreInput.trim()]);
      }
      setGenreInput("");
    }
  };

  // Remove a genre from the list
  const handleRemoveGenre = (index) => {
    setGenres((prevGenres) => prevGenres.filter((_, i) => i !== index));
  };

  const handleMediaSelection = (e, index) => {
    const updatedMedia = [...mediaArr];
    updatedMedia[index].mediaType = e.target.value;
    setMediaArr(updatedMedia);
  };

  const handleMediaChange = (e, index) => {
    const updatedMedia = [...mediaArr];
    updatedMedia[index].mediaURL = e.target.value;
    setMediaArr(updatedMedia);
  };

  const addMedia = () => {
    // Append a new media object to the array with default values
    setMediaArr([...mediaArr, { mediaType: "", mediaURL: "" }]);
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
        genre: genres,
        socials: socialsArr,
      })
      .then((resp) => {
        const artistId = resp.data.id;
        setNewArtistId(resp.data.id); // Save the new artist ID

        const mediaPromises = mediaArr.map((media, index) =>
          userServices.postMediaByArtistID({
            artistId: artistId,
            // mediaType: optionsMediaArr[index],
            mediaType: media.mediaType,
            // mediaURL: media.mediaURL,
            mediaURL: media.mediaURL,
          })
        );
        setSuccessMessage("Artist created successfully!");
        // Execute all promises concurrently
        return Promise.all(mediaPromises);
      })
      .then((responses) => {
        console.log(responses);
        // Handle responses here if needed
      })
      .catch((error) => {
        setSuccessMessage("Failed to create artist. Please try again.");
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
    setGenres([]);
    // setSelectedMedia("");
    // setMediaArr([{}]);
  };
  console.log(socialsArr);
  console.log(mediaArr);
  const viewProfile = () => {
    if (newArtistId) {
      navigate(`/artists/${newArtistId}`);
    }
  };
  return (
    <div className="profile-container">
      {/* <h2>Your Artist Profile </h2> */}

      {successMessage && (
        <div className="success-message">
          {successMessage}
          {newArtistId && (
            <button onClick={viewProfile} className="btn-primary ml-2">
              View Profile
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col text-left p-5">
        <h2 className="px-0">Your Artist Profile </h2>
        <div className="addArtist-labels">
          <div className="py-2.5 flex flex-row">
            <label>
              Image:
              <br />
              <input
                name="image"
                type="url"
                placeholder="enter image-URL"
                value={image}
                onChange={handleImage}
                className="border rounded-sm"
              />
            </label>
          </div>
          <div className="py-2.5">
            <label>
              Name:
              <br />
              <textarea
                name="artistName"
                type="text"
                placeholder="enter artist name"
                value={artistName}
                onChange={handleArtistName}
                className="resize-y"
              />
            </label>
          </div>
          <div className="py-2.5">
            <label>
              Bio:
              <br />
              <textarea
                name="bio"
                type="text"
                placeholder="enter bio"
                value={bio}
                onChange={handleBio}
                className="resize-y"
              />
            </label>
            {bioErrorMessage && (
              <p style={{ color: "red" }}>{bioErrorMessage}</p>
            )}
          </div>
          <div className="py-2.5">
            <label>
              Shoutout:
              <br />
              <textarea
                name="shoutout"
                type="text"
                placeholder="enter a community shoutout"
                value={shoutout}
                onChange={handleShoutout}
                className="resize-y"
              />
            </label>
            {shoutoutErrorMessage && (
              <p style={{ color: "red" }}>{shoutoutErrorMessage}</p>
            )}
          </div>
          <div className="py-2.5">
            <label>
              Location:
              <br />
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
          </div>
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
          {/* <div className="py-2.5">
            <label>
              Genre:
              <br />
              <input
                name="genre"
                type="text"
                placeholder="enter music genres"
                value={genre}
                onChange={handleGenre}
              />
            </label> */}
        </div>
        <div className="py-2.5">
          <div className="genre-labels">
            <label>
              Genres:
              <input
                type="text"
                placeholder="Type and press Enter to add genre"
                value={genreInput}
                onChange={handleGenreInputChange}
                onKeyDown={handleGenreKeyDown}
              />
            </label>
            <ul>
              {genres.map((g, index) => (
                <li key={index}>
                  {g}
                  <button
                    type="button"
                    onClick={() => handleRemoveGenre(index)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <br />
          </div>
          {/* <label>
            Genre:
            <br />
            <input
              name="genre"
              type="text"
              placeholder="enter genres"
              value={genre}
              onChange={handleGenre}
            />
          </label> */}
          <br />
          <div className="py-2.5">
            <label>
              Add Socials:
              {socialsArr.map((social, index) => {
                return (
                  <div className="py-1.5">
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
                    <br />
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
              <button
                type="button"
                onClick={addSocial}
                className="btn-primary m-0 py-1.5"
              >
                + more
              </button>
            </label>
          </div>
          <br />

          {/* <h2 className="px-0">Your Media</h2> */}
          <div className="py-2.5">
            {/* add media here */}

            {mediaArr.map((media, mediaIndex) => (
              <div className="py-1.5" key={mediaIndex}>
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
                <br />
                <input
                  name={`url-${mediaIndex}`}
                  type="url"
                  placeholder="Enter media URL"
                  value={media.mediaURL || ""}
                  onChange={(e) => handleMediaChange(e, mediaIndex)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMedia}
            className="btn-primary m-0 py-1.5"
          >
            Add More
          </button>
          <br />
        </div>
        <button type="submit" className="btn-primary-green-bg mt-10">
          Submit Profile
        </button>
      </form>
    </div>
  );
}

export default CreateArtistPage;
