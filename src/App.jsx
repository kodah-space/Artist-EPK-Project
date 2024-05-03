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
import userServices from "./services/UserServices";
import { useEffect } from "react";

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

        <h1 className="logo-line">mink</h1>
        <h1>Just Testing</h1>
        <p className="test-text">
          Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
          Neogale and Mustela and part of the family Mustelidae, which also
          includes weasels, otters, and ferrets.
        </p>
        <p className="test-text-two">
          Mink are dark-colored, semiaquatic, carnivorous mammals of the genera
          Neogale and Mustela and part of the family Mustelidae, which also
          includes weasels, otters, and ferrets.
        </p>

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
          <Route path="/artists/:artistID" element={<ArtistPage />} />
          <Route path="/artists/create" element={<CreateArtistPage />} />
          <Route
            path="/artists/media/:artistID"
            element={<ArtistMediaPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
