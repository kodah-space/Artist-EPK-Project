import React from "react";

function Spotify(media) {
  function convertToEmbedUrl(watchUrl) {
    const trackId = watchUrl.split("/track/")[1].split("?")[0];
    if (trackId) {
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    } else {
      // Handle invalid or unrecognized URL format
      return null;
    }
  }

  const watchUrl = media.url;
  const embedUrl = convertToEmbedUrl(watchUrl);

  return (
    <div>
      {" "}
      <iframe
        src={embedUrl}
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Spotify;
