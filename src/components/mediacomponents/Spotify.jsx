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
    <div className="h-28">
      {" "}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Spotify;
