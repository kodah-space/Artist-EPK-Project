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
          const seen = new Set();
          console.log("Fetching locations for:", query);
          const formattedSuggestions = response.data
            .map((item) => {
              const city =
                item.address.city ||
                item.address.town ||
                item.address.village ||
                "";
              const country = item.address.country;
              const displayName = city ? `${city}, ${country}` : country;
              const uniqueKey = `${city}-${country}`.toLowerCase();
              return {
                display_name: displayName,
                lat: item.lat,
                lon: item.lon,
                uniqueKey: uniqueKey,
              };
            })
            .filter((item) => {
              // Keep only unique combinations of city-country names
              if (seen.has(item.uniqueKey)) {
                return false;
              } else {
                seen.add(item.uniqueKey);
                return true;
              }
            });
          setSuggestions(formattedSuggestions);
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
