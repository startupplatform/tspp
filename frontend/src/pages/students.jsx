import React from "react";
import { InHeader } from "../components/inheader";
import {
  Typography,
  Card,
  CardBody,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ArrowRight, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "TSU",
    businesses: [
      {
        name: "Acme Diner",
        description: "Classic American diner fare",
        phone: "555-0101",
      },
      {
        name: "Sushi Delights",
        description: "Authentic Japanese sushi",
        phone: "555-0102",
      },
      {
        name: "The Pasta House",
        description: "Homemade Italian pasta",
        phone: "555-0103",
      },
      {
        name: "Burger Bliss",
        description: "Juicy burgers and fries",
        phone: "555-0104",
      },
      {
        name: "Spice Emporium",
        description: "Flavorful Indian cuisine",
        phone: "555-0105",
      },
    ],
  },
  {
    name: "FUW",
    businesses: [
      {
        name: "Chic Boutique",
        description: "Trendy fashion and accessories",
        phone: "555-0201",
      },
      {
        name: "Bookworm's Haven",
        description: "Cozy bookstore with rare finds",
        phone: "555-0202",
      },
      {
        name: "Green Thumb",
        description: "Nursery and gardening supplies",
        phone: "555-0203",
      },
      {
        name: "Tech Emporium",
        description: "Latest electronics and gadgets",
        phone: "555-0204",
      },
      {
        name: "Artisan Crafts",
        description: "Handmade local crafts and gifts",
        phone: "555-0205",
      },
    ],
  },
  {
    name: "Other Schools",
    businesses: [
      {
        name: "Wellness Spa",
        description: "Relaxing spa treatments",
        phone: "555-0301",
      },
      {
        name: "Legal Experts",
        description: "Professional legal services",
        phone: "555-0302",
      },
      {
        name: "Accounting Solutions",
        description: "Comprehensive financial services",
        phone: "555-0303",
      },
      {
        name: "IT Consultants",
        description: "Reliable tech support and solutions",
        phone: "555-0304",
      },
      {
        name: "Event Planners",
        description: "Curated events and celebrations",
        phone: "555-0305",
      },
    ],
  },
];

const StudentBusinesses = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-brown-50 bg-opacity-70"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="mt-2 max-w-3xl text-center mx-auto mb-4">
          <Typography
            variant="h1"
            color="brown"
            className="font-bold text-xl md:text-2xl lg:text-3xl"
          >
            BIU Students Businesses
          </Typography>
        </div>

        {categories.map((category) => (
          <div
            key={category.name}
            className="mb-4 bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Typography
                variant="h2"
                color="brown"
                className="text-lg font-bold"
              >
                {category.name}
              </Typography>
              <Link
                href="#"
                className="text-brown-600 hover:text-brown-800"
                prefetch={false}
              >
                <Button
                  color="brown"
                  size="sm"
                  variant="text"
                  className="flex items-center gap-2"
                >
                  View all
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="flex overflow-x-auto pb-2 gap-4">
              {category.businesses.map((business, index) => (
                <Card key={index} className="w-64 shrink-0 bg-brown-50">
                  <CardBody>
                    <Typography variant="h6" color="brown" className="mb-1">
                      {business.name}
                    </Typography>
                    <Typography color="gray" className="text-sm mb-2">
                      {business.description}
                    </Typography>
                    <div className="flex items-center justify-between">
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
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentBusinesses;
