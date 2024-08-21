import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Button, Carousel, Typography } from "@material-tailwind/react";
import ThirdSection from "../components/third";
import Footer from "../components/footer";
import Fourth from "../components/fourth";
import Fifth from "../components/fifth";

function FeatureCarousel({ feature }) {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplay={true}
      autoplayDelay={2000}
      loop={true}
    >
      <div className="relative h-full w-full">
        <img
          src={feature.image}
          alt={feature.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-center p-4">
            <Typography
              variant="h2"
              color="white"
              className="mb-2 text-2xl font-bold"
            >
              {feature.title}
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="text-sm md:text-base"
            >
              {feature.description}
            </Typography>
          </div>
        </div>
      </div>
      {/* You can add more slides here if needed */}
    </Carousel>
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
      description: "Make Public any business or upcoming event in Taraba",
      image: "/two.jpg",
    },
    {
      title: "Update",
      description:
        "Stay up to date with all events and business in Taraba state",
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
                The Taraba State Promotion Platform aims to boost visibility for
                events, businesses, and individuals in Taraba State by providing
                a user-friendly online platform for showcasing and promoting
                local initiatives. The platform will use a community-driven
                approach to highlight popular entries and offer various
                promotional opportunities.
              </p>
              <Link to={"/signup"}>
                <Button size="lg" className="bg-gray">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-4 md:space-x-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative group transition-all duration-300 ease-in-out w-full sm:w-1/3
                  ${
                    index === 1
                      ? "h-80 sm:h-64 md:h-80 z-10"
                      : "h-64 sm:h-48 md:h-64"
                  }
                `}
                >
                  <FeatureCarousel feature={feature} />
                </div>
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
