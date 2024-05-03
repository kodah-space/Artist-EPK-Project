import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import Artists from "./components/artists/Artists";
import ArtistPage from "./pages/artistPage/ArtistPage";
import CreateArtistPage from "./pages/createArtistPage/CreateArtistPage";
import EditArtistPage from "./pages/editArtistPage/EditArtistPage";
import DeleteArtist from "./components/artists/DeleteArtist.jsx";
import ArtistMediaPage from "./pages/artistMediaPage/ArtistMediaPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import userServices from "./services/UserServices";
import { useEffect } from "react";
import SoundCloud from "./components/mediacomponents/SoundCloud.jsx";
import Youtube from "./components/mediacomponents/Youtube.jsx";
import Spotify from "./components/mediacomponents/Spotify.jsx";

function App() {
  // useEffect(() => {
  //   userServices
  //     .createNewUser({
  //       ArtistName: "zzzzzzzzzz",
  //       bio: "zzzzzzzzzzz",
  //     })
  //     .then((resp) => console.log(resp.data));
  // }, []);

  return (
    <>
      <Navbar />
      <SoundCloud />
      <Youtube />
      <Spotify />
      <div className="p-4 mr-1 ml-1">
        <p className="text-xl text-[#26C281] md:px-20">
          Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
          Neogale and Mustela and part of the family Mustelidae, which also
          includes weasels, otters, and ferrets.
        </p>
        <button className="btn-primary">some button</button>
        <button className="btn-primary-green-bg">Some other Button</button>
        <p className="test-text-two">
          Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
          Neogale and Mustela and part of the family Mustelidae, which also
          includes weasels, otters, and ferrets.
        </p>
        <h2 className="h2">Headline Two</h2>
        <Link to="/"> Go to Home Page </Link>
        <br />
        <Link to="/contact"> Go to Contact Page </Link>
        <br />
        <Link to="/about"> Go to AboutPage </Link>
        <br />
        <Link to="/artists"> Go to Artists </Link>
        <br />
        <Link to="/artists/1"> Go to one Artist Page </Link>
        <br />
        <Link to="/artists/create"> Go to Create Artist Page</Link>
        <br />
        <Link to="/artists/media/1"> Go to Create Artist Page</Link>

        <EditArtistPage />
        <DeleteArtist />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/artists/create" element={<CreateArtistPage />} />
          <Route
            path="/artists/media/:artistId"
            element={<ArtistMediaPage />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
