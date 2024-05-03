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
    <nav className="p-4">
      <div class="max-w-screen-xl md:px-5 flex flex-wrap items-center justify-between mx-auto padding-bottom0 md:pb-2">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-3xl font-['Unbounded-Medium'] whitespace-nowrap">
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
              strokeWidth="2"
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
          <ul class="font-medium flex flex-col tracking-wide p-2 py-0 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="/about"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] hover:underline md:p-0 md:m-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] hover:underline md:p-0"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/artists/create"
                class="block py-1 px-0 text-right text-black md:hover:bg-transparent md:border-0 hover:text-[#26C281] hover:underline md:p-0"
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
