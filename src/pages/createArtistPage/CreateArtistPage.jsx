import React, { useEffect } from "react";
import { useState } from "react";
import userServices from "../../services/UserServices";

function CreateArtistPage() {
  const [image, setImage] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [type, setType] = useState("");
  const [selectedSocial, setSelectedSocial] = useState("");
  const [socialsArr, setSocialsArr] = useState([{ value: "" }]);

  const handleImage = (e) => setImage(e.target.value);
  const handleArtistName = (e) => setArtistName(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const addSocial = () => {
    setSocialsArr([...socialsArr, { value: "" }]);
  };

  const handleSocialChange = (e, i) => {
    const updatedSocials = [...socialsArr];
    updatedSocials[i] = {
      ...updatedSocials[i],
      value: e.target.value,
    };
    setSocialsArr(updatedSocials);
  };

  const options = ["Instagram", "Facebook", "Cloud"];
  const handleSocialSelection = (e) => {
    setSelectedSocial(e.target.value);
  };

  //submit the new form
  const handleSubmit = (e) => {
    e.preventDefault();

    userServices
      .createNewUser({
        ArtistName: artistName,
        bio: bio,
        type: type,
        socials: socialsArr,
      })
      .then((resp) => console.log(resp.data));

    //reset form fields
    setArtistName("");
    setBio("");
    setType("");
    setSocials("");
    setSocials([{ id: "", type: "", value: "" }]);

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
          <br />
          <label>
            Type:
            <input
              name="type"
              type="text"
              placeholder="Enter Type"
              value={type}
              onChange={handleType}
            />
          </label>
          <br />
          <label>
            Add yor Socials:
            {socialsArr.map((social, index) => {
              return (
                <div>
                  <select
                    id={`datalist-${index}`}
                    value={selectedSocial}
                    onChange={handleSocialSelection}
                  >
                    {options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    name={social.value}
                    type="text"
                    placeholder="Enter Social Network"
                    key={index}
                    value={social.value}
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
        </div>
        {/* <button type="submit" onClick={handleClick}> */}
        <button type="submit">Create New Artist</button>
      </form>
    </div>
  );
}

export default CreateArtistPage;