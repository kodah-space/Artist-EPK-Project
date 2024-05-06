import React from "react";

function soundcloud(url) {
  return (
    <div>
      {" "}
      <iframe
        width="100%"
        height="130"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src={url}
      ></iframe>
    </div>
  );
}

export default soundcloud;
