import axios from "axios";
const API_KEY = "4b3ad6c320f5b52e5939eba95809fa9c"; // Replace this with your actual Last.fm API key
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

const searchArtists = async (artistName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?method=artist.search&artist=${artistName}&api_key=${API_KEY}&format=json`
    );
    return response.data.results.artistmatches.artist;
  } catch (error) {
    console.error("Error searching artists:", error);
    return [];
  }
};

const getArtistInfo = async (artistName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`
    );
    return response.data.artist;
  } catch (error) {
    console.error("Error fetching artist info:", error);
    return null;
  }
};

const getArtistTopAlbums = async (artistName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?method=artist.gettopalbums&artist=${artistName}&api_key=${API_KEY}&format=json`
    );
    return response.data.topalbums.album;
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    return [];
  }
};

export { searchArtists, getArtistInfo, getArtistTopAlbums };




