import React from "react";
import { useEffect, useState } from "react";
import userServices from "../../services/UserServices";

export default function ArtistCard({ artist }) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg md:max-w-80 flex-start">
      <div class="relative mx-auto">
        <img
          alt="Artist Image"
          className="block h-auto w-full object-cover "
          src={artist.imageUrl}
        ></img>
        {/* <div className="flex items-center justify-between leading-none p-2 md:p-4">
          <a className="border-white hover:text-white" href="#">
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a>
        </div> */}
        <div class="absolute inset-0 flex items-end justify-start">
          <div className="flex justify-between leading-tight p-2 md:p-4">
            <h3 className="text-6xl text-left text-white">
              {artist.artistName}
            </h3>
          </div>
        </div>
      </div>
      <div className="text-right p-2">
        <p className="text-grey-darker text-sm">LOCATION</p>
      </div>
      <div className="px-3 pb-3 line-clamp-5">
        <p className="font-[Linux-Libertine] text-xl">{artist.shoutout}</p>
      </div>
    </div>
  );
}
