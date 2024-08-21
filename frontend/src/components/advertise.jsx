import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Carousel,
} from "@material-tailwind/react";
import { MapPin, Calendar, Clock, ArrowFatLinesUp } from "@phosphor-icons/react";

const EventDetails = ({ event }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Background Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${event.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Typography variant="h2" color="white" className="text-center">
            {event.name}
          </Typography>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Event Details
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar size={24} className="mr-2 text-blue-500" />
                    <Typography>{event.date}</Typography>
                  </div>
                  <div className="flex items-center">
                    <Clock size={24} className="mr-2 text-blue-500" />
                    <Typography>{event.time}</Typography>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={24} className="mr-2 text-blue-500" />
                    <Typography>{event.location}</Typography>
                  </div>
                </div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mt-8 mb-2"
                >
                  Description
                </Typography>
                <Typography>{event.description}</Typography>
                <Button color="brown" ripple="light" className="mt-8 flex justify-center">
                  <ArrowFatLinesUp size={20} className="mr-2"/> Upvote
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar with Ads */}
          <div>
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Images
                </Typography>
                <Carousel className="rounded-xl">
                  {event.ads.map((ad, index) => (
                    <img
                      key={index}
                      src={ad.image}
                      alt={`Advertisement ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ))}
                </Carousel>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Featured Sponsors Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-8 text-center"
          >
            Featured Companies
          </Typography>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {event.sponsors.map((sponsor, index) => (
              <img
                key={index}
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
