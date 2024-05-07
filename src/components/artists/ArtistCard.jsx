import React from "react";
import { useEffect, useState } from "react";
import userServices from "../../services/UserServices";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="overflow-hidden rounded-lg shadow-lg md:max-w-64 flex-start m-3">
        <div class="relative mx-auto">
          <img
            alt="Artist Image"
            className="block h-auto w-full object-cover "
            src={artist.imageUrl}
          ></img>
          <div class="absolute inset-0 flex items-end justify-start">
            <div className="flex justify-between leading-tight p-1 md:p-2">
              <h3 className="text-4xl text-left text-white">
                {artist.artistName}
              </h3>
            </div>
          </div>
        </div>
        <div className="text-right p-2">
          <p className="text-grey-darker text-sm">› {artist.location}</p>
        </div>
        <div className="px-3 pb-3 line-clamp-5">
          <p className="font-[Linux-Libertine] text-l">{artist.shoutout}</p>
        </div>
        {console.log(artist.genre)}
        {/* {artist.genre.map((g, index) => (
          <li key={index}>{g}</li>
        ))} */}

        {artist &&
          artist.genre &&
          Array.isArray(artist.genre) &&
          artist.genre.map((g, index) => <li key={index}>{g}</li>)}
      </div>
    </Link>
  );
}
