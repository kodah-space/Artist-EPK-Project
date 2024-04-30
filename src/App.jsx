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
import DeleteArtist from "./components/deleteArtist/DeleteArtist";
import ArtistMediaPage from "./pages/artistMediaPage/ArtistMediaPage";

function App() {
  return (
    <>
      <div>
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
