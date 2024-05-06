import React from "react";

function Youtube(media) {
  console.log(media.url, "testurl");

  const watchUrl = media.url;

  function convertToEmbedUrl(watchUrl) {
    const videoId = watchUrl.split("v=")[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      // Handle invalid or unrecognized URL format
      return null;
    }
  }
  const embedUrl = convertToEmbedUrl(watchUrl);

  return (
    <div>
      {" "}
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Youtube;
