import React from "react";
import ArtistCard from "./ArtistCard";

export default function Artists({ artists }) {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <ul className="flex flex-wrap -mx-1 lg:-mx-4">
        {artists.length === 0 && "*nothing here yet*"}
        <li className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
          {artists.map((artist) => {
            return <ArtistCard />;
          })}
        </li>
      </ul>
    </div>
  );
}
