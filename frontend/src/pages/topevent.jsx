import React from "react";
import { InHeader } from "../components/inheader";
import EventDetails from "../components/advertise";

const eventExample = {
  name: "Koinonia 2024",
  backgroundImage: "/church.jpg",
  date: "August 15-17, 2024",
  time: "9:00 AM - 6:00 PM",
  location: "Heritage Campus, Benson Idahosa University",
  description:
    "Join us for the Koinonia! Featuring Joshua Selman and keynote speakers.",
  ads: [{ image: "/c.jpg" }, { image: "/bg.jpg" }, { image: "/cover.jpg" }],
  sponsors: [
    { name: "Useme", logo: "/mode.jpg" },
    { name: "RokPena", logo: "/four.jpg" },
    { name: "FutureTech", logo: "/three.jpg" },
  ],
};

const TopEvents = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="mt-2 max-w-3xl text-center mx-auto mb-4">
          <h1 className="block font-bold text-brown-700 text-2xl md:text-3xl lg:text-3xl">
            Top Upcoming Events
          </h1>
        </div>
        <EventDetails event={eventExample} />
      </div>
    </div>
  );
};

export default TopEvents;
