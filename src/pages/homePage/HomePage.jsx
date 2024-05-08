import React from "react";
import ArtistMediaPage from "../artistMediaPage/ArtistMediaPage";
import Artists from "../../components/artists/Artists";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homePage-container m-4">
      <p className="text-xl text-black pb-5 md:py-10 md:px-20">
        <b>mink</b> is a platform designed for musicians and music producers.
        <br />
        Share your work, exchange, and connect with others in the music
        community.
      </p>
      <Link to="/artists/create" className="btn-primary-green-bg">
        Create Your Profile
      </Link>
      <h2 classname="text-left mb-0">Artists</h2>

      <Artists />
    </div>
  );
}

export default HomePage;
