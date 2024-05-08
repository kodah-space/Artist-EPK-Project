import React from "react";
import ArtistCard from "./ArtistCard";
import userServices from "../../services/UserServices";
import { useState, useEffect } from "react";
//Use Effect
//getallUsers (UserServices) /// use effect get all artist

export default function Artists() {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    userServices
      .getAllUsers()
      .then((resp) => {
        // console.log(resp.data);
        setAllUsers(resp.data);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  console.log(allUsers);
  if (!allUsers) return "loading...";

  return (
    <div className="container mx-auto px-4 md:px-12">
      <ul className="flex flex-wrap justify-center my-12">
        {allUsers.map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </ul>
    </div>
  );
}
