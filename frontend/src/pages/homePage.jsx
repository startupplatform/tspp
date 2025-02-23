import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button, Typography } from "@material-tailwind/react";
import ThirdSection from "../components/third";
import Footer from "../components/footer";
import Fourth from "../components/fourth";
import Fifth from "../components/fifth";

function FeatureCard({ feature, index }) {
  return (
    <div
      className={`relative group transition-all duration-300 ease-in-out w-full sm:w-1/3
        ${index === 1 ? "h-80 sm:h-64 md:h-80 z-10" : "h-64 sm:h-48 md:h-64"}
      `}
    >
      <img
        src={feature.image}
        alt={feature.title}
        className="h-full w-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <Typography
            variant="h2"
            className="mb-2 text-2xl font-bold text-white"
          >
            {feature.title}
          </Typography>
          <Typography
            variant="paragraph"
            className="text-sm md:text-base text-white"
          >
            {feature.description}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const features = [
    {
      title: "Connect",
      description: "Sign In or Sign Up",
      image: "/chat.jpg",
    },
    {
      title: "Advertise",
      description: "Make Public any business or upcoming event in BIU",
      image: "/two.jpg",
    },
    {
      title: "Update",
      description:
        "Stay up to date with all events and business in Benson Idahosa University",
      image: "/date.webp",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-opacity-100"></div>
        <div
          className="min-h-screen bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/five.jpg')" }}
        >
          <div className="absolute inset-0 bg-gray-400 bg-opacity-50"></div>
          <Header />
          <main className="relative z-10 container mx-auto px-4 py-10 md:py-12 lg:py-16 text-white">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-800">
                Connect. Advertise. Update.
              </h1>
              <p className="text-lg mb-10 text-gray-800 mx-auto font-light">
                The BIU HUB aims to boost visibility for events, businesses, and
                individuals in Benson Idahosa University by providing a
                user-friendly online platform for showcasing and promoting local
                initiatives. The platform will use a community-driven approach
                to highlight popular entries and offer various promotional
                opportunities.
              </p>
              <Link to={"/signup"}>
                <Button size="lg" className="bg-gray">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-4 md:space-x-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </main>
        </div>
        <Fourth />
        <ThirdSection />
        <Fifth />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
