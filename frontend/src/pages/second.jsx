import React from "react";
import { Link } from "react-router-dom";
import { InHeader } from "../components/inheader";

function TarabaBusinessHub() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      <InHeader />
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-brown-200 text-sm text-brown-800 p-1 ps-3 rounded-full transition hover:border-brown-300 focus:outline-none focus:border-brown-300 shadow-sm"
              href="/individual"
            >
              New: Upcoming Taraba Stars
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-brown-100 font-semibold text-sm text-brown-800">
                <svg
                  className="shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          <div className="mt-8 max-w-3xl text-center mx-auto">
            <h1 className="block font-bold text-brown-700 text-3xl md:text-5xl lg:text-6xl">
              Discover Taraba
            </h1>
          </div>

          <div className="mt-4 max-w-2xl text-center mx-auto">
            <p className="text-lg text-gray-700">
              Your one-stop platform for exploring local businesses, upcoming
              events, and staying connected with Taraba's vibrant community.
            </p>
          </div>

          <div className="mt-14 gap-4 flex justify-center">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-brown-500 to-brown-500 hover:from-brown-600 hover:to-brown-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-6"
              href="/addevent"
            >
              List An Entry
              <svg
                className="shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </a>
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center border border-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 py-3 px-6"
              href="/business"
            >
               Businesses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-5 h-5"
                stroke="currentColor"
                fill="#000000"
                viewBox="0 0 256 256"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
              </svg>
            </a>
          </div>

          <div className="mt-14 flex justify-center items-center gap-x-6">
            <div className="flex items-center gap-x-1 sm:gap-x-3">
              <span className="text-sm font-medium text-gray-800 mr-2">
                Featured Categories:
              </span>
              <span className="text-sm text-gray-600">
                Entries • Events • Advert • Individuals 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarabaBusinessHub;
