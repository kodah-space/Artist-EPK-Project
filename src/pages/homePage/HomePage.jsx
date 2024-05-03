import React from "react";

function HomePage() {
  return (
    <div className="homePage-container m-4">
      <p className="text-xl text-black pb-2 md:py-10 md:px-20">
        Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
        Neogale and Mustela and part of the family Mustelidae, which also
        includes weasels, otters, and ferrets.
      </p>
      <button className="btn-primary-green-bg">Create Your Profile</button>
      <h2 classname="text-left pt-10 pb-5">Artists</h2>
    </div>
  );
}

export default HomePage;
