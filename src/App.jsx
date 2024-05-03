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
      <Footer />
    </>
  );
}

export default App;
