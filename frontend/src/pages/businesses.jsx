import React, { useState } from "react";
import { InHeader } from "../components/inheader";
import {
  Typography,
  Card,
  CardBody,
  Button,
  IconButton,
  CardFooter,
} from "@material-tailwind/react";
import { ArrowRight, Phone, MapPin, Info, Clock } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import categories from "../components/categoriesmock";

const Businesses = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleBusinessClick = (categoryName, businessId) => {
    navigate(`/business/${categoryName.toLowerCase()}/${businessId}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-brown-50 bg-opacity-90"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="max-w-4xl text-center mx-auto mb-8">
          <Typography
            variant="h1"
            color="brown"
            className="font-bold text-3xl md:text-4xl mb-2"
          >
            Campus Services
          </Typography>
          <Typography color="brown-gray" className="text-lg">
            Discover resources and services available for students, faculty, and
            staff
          </Typography>
        </div>

        {categories.map((category) => (
          <div
            key={category.name}
            className="mb-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <Typography
                  variant="h2"
                  color="brown"
                  className="text-2xl font-bold mb-2"
                >
                  {category.name}
                </Typography>
                <Typography color="brown-gray" className="text-md">
                  {category.description}
                </Typography>
              </div>
              <Link
                to={`/category/${category.name.toLowerCase()}`}
                className="mt-3 md:mt-0"
              >
                <Button
                  color="brown"
                  size="sm"
                  className="flex items-center gap-2 rounded-lg"
                >
                  View all
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.businesses.map((business, index) => (
                <Card
                  key={index}
                  className={`bg-brown-50 transition-all duration-300 ${
                    hoveredCard === `${category.name}-${business.id}`
                      ? "shadow-lg transform -translate-y-1"
                      : "shadow"
                  }`}
                  onMouseEnter={() =>
                    setHoveredCard(`${category.name}-${business.id}`)
                  }
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() =>
                    handleBusinessClick(category.name, business.id)
                  }
                >
                  <div className="h-36 bg-brown-100 rounded-t-xl flex items-center justify-center">
                    <Info size={48} className="text-brown-300" />
                    {/* Image would go here in production */}
                    {/* <img 
                      src={business.image} 
                      alt={business.name}
                      className="w-full h-full object-cover rounded-t-xl"
                    /> */}
                  </div>
                  <CardBody>
                    <Typography
                      variant="h6"
                      color="brown"
                      className="mb-2 font-bold"
                    >
                      {business.name}
                    </Typography>
                    <Typography color="brown-gray" className="text-sm mb-3">
                      {business.description}
                    </Typography>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <MapPin size={16} className="text-brown-500" />
                      <Typography color="brown-gray" className="text-sm">
                        {business.location}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-brown-500" />
                      <Typography color="brown-gray" className="text-sm">
                        {business.hours}
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <Typography color="brown" className="text-sm font-medium">
                      {business.phone}
                    </Typography>
                    <IconButton
                      variant="text"
                      color="brown"
                      size="sm"
                      className="rounded-full"
                    >
                      <Phone size={18} />
                    </IconButton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
