import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InHeader } from "../components/inheader";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Breadcrumbs,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Rating,
} from "@material-tailwind/react";
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  ArrowLeft,
  Globe,
  EnvelopeSimple,
  Info,
  Users,
  Star,
} from "@phosphor-icons/react";
import categories from "../components/categoriesmock";

const BusinessDetail = () => {
  const { categoryName, businessId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the category and business from the URL parameters
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (foundCategory) {
      setCategory(foundCategory);
      const foundBusiness = foundCategory.businesses.find(
        (biz) => biz.id === businessId
      );

      if (foundBusiness) {
        setBusiness(foundBusiness);
      }
    }

    setLoading(false);
  }, [categoryName, businessId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!business || !category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Typography variant="h4" className="mb-4">
          Business Not Found
        </Typography>
        <Button color="blue" onClick={() => navigate("/businesses")}>
          Return to Directory
        </Button>
      </div>
    );
  }

  // Mock data for the business detail page
  const businessDetails = {
    ...business,
    website: "https://university.edu/services/" + business.id,
    email: business.id + "@university.edu",
    description: `${business.name} is a service provided by the university to support student and faculty needs. ${business.description} with a focus on quality and convenience.`,
    services: [
      "Service 1 related to " + business.name,
      "Service 2 related to " + business.name,
      "Service 3 related to " + business.name,
      "Service 4 related to " + business.name,
    ],
    events: [
      {
        title: "Special Event at " + business.name,
        date: "April 15, 2025",
        time: "3:00 PM - 5:00 PM",
        location: business.location,
      },
      {
        title: "Workshop: Using " + business.name,
        date: "April 22, 2025",
        time: "2:00 PM - 4:00 PM",
        location: business.location,
      },
    ],
    reviews: [
      {
        user: "Student",
        rating: 4,
        comment: "Really helpful service, saved me a lot of time.",
        date: "March 20, 2025",
      },
      {
        user: "Faculty Member",
        rating: 5,
        comment: "Excellent resources and friendly staff.",
        date: "March 15, 2025",
      },
      {
        user: "Campus Visitor",
        rating: 3,
        comment: "Good service but limited hours on weekends.",
        date: "March 10, 2025",
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-blue-50 bg-opacity-90"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs className="bg-white bg-opacity-70 p-2 rounded mb-6">
          <a href="/businesses" className="opacity-60">
            Campus Directory
          </a>
          <a
            href={`/category/${categoryName.toLowerCase()}`}
            className="opacity-60"
          >
            {category.name}
          </a>
          <a href="#" className="font-bold">
            {business.name}
          </a>
        </Breadcrumbs>

        {/* Back button */}
        <Button
          color="blue"
          variant="text"
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate("/businesses")}
        >
          <ArrowLeft size={16} />
          Back to Directory
        </Button>

        {/* Business Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-48 bg-blue-500 flex items-center justify-center">
            <Info size={64} className="text-white" />
            {/* Image would go here in production */}
            {/* <img 
              src={business.image} 
              alt={business.name}
              className="w-full h-full object-cover"
            /> */}
          </div>
          <CardBody>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <Typography
                  variant="h3"
                  color="blue"
                  className="font-bold mb-2"
                >
                  {business.name}
                </Typography>
                <Typography className="mb-4 text-lg">
                  {businessDetails.description}
                </Typography>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-blue-500" />
                    <Typography>{business.location}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" />
                    <Typography>{business.hours}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={20} className="text-blue-500" />
                    <Typography>{business.phone}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <EnvelopeSimple size={20} className="text-blue-500" />
                    <Typography>{businessDetails.email}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-blue-500" />
                    <Typography>{businessDetails.website}</Typography>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <Typography variant="h6" className="mb-2">
                  Average Rating
                </Typography>
                <div className="flex items-center gap-2 mb-2">
                  <Rating value={4} readonly />
                  <Typography className="font-bold">4.0</Typography>
                  <Typography className="text-sm text-blue-gray-600">
                    ({businessDetails.reviews.length} reviews)
                  </Typography>
                </div>
                <Button color="blue" fullWidth className="mt-2">
                  Submit a Review
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Tabs for different sections */}
        <Tabs value="services">
          <TabsHeader>
            <Tab value="services" className="flex items-center gap-2">
              <Info size={18} />
              Services
            </Tab>
            <Tab value="events" className="flex items-center gap-2">
              <Calendar size={18} />
              Events
            </Tab>
            <Tab value="reviews" className="flex items-center gap-2">
              <Star size={18} />
              Reviews
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="services">
              <Card>
                <CardBody>
                  <Typography variant="h5" color="blue" className="mb-4">
                    Services Offered
                  </Typography>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {businessDetails.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <Typography>{service}</Typography>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel value="events">
              <Card>
                <CardBody>
                  <Typography variant="h5" color="blue" className="mb-4">
                    Upcoming Events
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessDetails.events.map((event, index) => (
                      <Card key={index} className="bg-blue-50">
                        <CardBody>
                          <Typography variant="h6" className="mb-2">
                            {event.title}
                          </Typography>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-blue-500" />
                            <Typography className="text-sm">
                              {event.date}
                            </Typography>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-blue-500" />
                            <Typography className="text-sm">
                              {event.time}
                            </Typography>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-blue-500" />
                            <Typography className="text-sm">
                              {event.location}
                            </Typography>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel value="reviews">
              <Card>
                <CardBody>
                  <Typography variant="h5" color="blue" className="mb-4">
                    User Reviews
                  </Typography>
                  <div className="space-y-4">
                    {businessDetails.reviews.map((review, index) => (
                      <Card key={index} className="bg-blue-50">
                        <CardBody>
                          <div className="flex items-center gap-2 mb-2">
                            <Users size={16} className="text-blue-500" />
                            <Typography className="font-medium">
                              {review.user}
                            </Typography>
                            <Typography className="text-sm text-blue-gray-600">
                              {review.date}
                            </Typography>
                          </div>
                          <div className="mb-2">
                            <Rating value={review.rating} readonly />
                          </div>
                          <Typography>{review.comment}</Typography>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDetail;
