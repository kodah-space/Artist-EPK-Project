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

      <div>

  
        <EditArtistPage />


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
