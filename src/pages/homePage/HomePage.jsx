import React from "react";
import ArtistMediaPage from "../artistMediaPage/ArtistMediaPage";
import Artists from "../../components/artists/Artists";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homePage-container m-4">
      <p className="text-xl text-black pb-5 md:py-10 md:px-20">
        Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
        Neogale and Mustela and part of the family Mustelidae, which also
        includes weasels, otters, and ferrets.
      </p>
      <Link to="/artists/create" className="btn-primary-green-bg">
        Create Your Profile
      </Link>
      <h2 classname="text-left">Artists</h2>

      <Artists />
    </div>
  );
}

export default HomePage;
