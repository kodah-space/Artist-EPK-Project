import { useState, useEffect } from "react";
import axios from "axios";

const useLocationSearch = (query, active) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length > 2) {
        const apiUrl = `https://us1.locationiq.com/v1/autocomplete.php?key=pk.6765426124fdc59dd330bb3ffcc70cdd&q=${query}&limit=5`;
        try {
          const response = await axios.get(apiUrl);
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching location data:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchLocations();
  }, [query, active]);

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return { suggestions, clearSuggestions };
};

export default useLocationSearch;
