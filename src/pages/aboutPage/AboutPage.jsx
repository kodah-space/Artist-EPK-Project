import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div>
      <h3>About mink</h3>

      <p className="font-[Linux-Libertine] text-xl p-4 mb-4 md:px-20">
        <b>mink</b> is a platform designed for musicians and music producers.
        Share your work, exchange and connect with others in the music
        community. Create your personal profile, showcase your work and
        collaborate with fellow creatives. <br />
        <b>mink</b> are dark-colored, semiaquatic, carnivorous mammals of the
        genera Neogale and Mustela and part of the family Mustelidae, which also
        includes weasels, otters, and ferrets.
      </p>
      <Link to={`/contact`} className="btn-primary">
        Get in Touch
      </Link>
      <Link to={`/artists/create`} className="btn-primary-green-bg">
        Create Your Profile
      </Link>
    </div>
  );
}

export default AboutPage;
