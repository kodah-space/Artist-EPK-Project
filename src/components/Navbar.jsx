import React from "react";
import { useState } from "react";

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the visibility of the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto padding-bottom0 pb-10">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-['Unbounded-Medium'] whitespace-nowrap">
            mink
          </span>
        </a>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black hover:text-[#26C281] md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="/about"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] md:p-0"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/artists/create"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] md:p-0"
              >
                Create Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
