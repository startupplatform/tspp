import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Trash,
  Globe,
  MapPin,
  Phone,
  EnvelopeSimple,
  Calendar,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InHeader } from "../components/inheader";
import MapInput from "../components/location";
import ImageUploader from "../components/imageupload";

const EntryCard = ({ entry, onDelete }) => (
  <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="md:flex">
      <div className="md:w-2/3 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{entry.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{entry.category}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <MapPin size={20} className="text-blue-500 mr-2" />
            <span className="text-sm text-gray-700">{entry.location}</span>
          </div>
          {entry.contact && (
            <div className="flex items-center">
              {entry.contact.includes("@") ? (
                <EnvelopeSimple size={20} className="text-blue-500 mr-2" />
              ) : (
                <Phone size={20} className="text-blue-500 mr-2" />
              )}
              <span className="text-sm text-gray-700">{entry.contact}</span>
            </div>
          )}
          {entry.website && (
            <div className="flex items-center">
              <Globe size={20} className="text-blue-500 mr-2" />
              <a
                href={entry.website}
                className="text-sm text-blue-500 hover:underline"
              >
                {entry.website.replace("https://", "")}
              </a>
            </div>
          )}
          {entry.date && (
            <div className="flex items-center">
              <Calendar size={20} className="text-blue-500 mr-2" />
              <span className="text-sm text-gray-700">
                {format(new Date(entry.date), "MMM d, yyyy")}
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4">{entry.description}</p>
      </div>

      {entry.photos && entry.photos.length > 0 && (
        <div className="md:w-1/3 p-6 bg-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Photos</h3>
          <div className="grid grid-cols-2 gap-2">
            {entry.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Entry photo ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="px-6 py-4 bg-gray-100">
      <Button
        size="sm"
        variant="text"
        className="flex items-center gap-2"
        color="red"
        onClick={onDelete}
      >
        <Trash size={16} />
        Delete Entry
      </Button>
    </div>
  </div>
);

const EntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    businessType: "",
    customBusinessType: "",
    location: "",
    contact: "",
    website: "",
    date: null,
    photos: [],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBusinessType, setShowBusinessType] = useState(false);
  const [showCustomBusinessType, setShowCustomBusinessType] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
      businessType: "",
      customBusinessType: "",
    });
    setShowDatePicker(
      [
        "Wedding",
        "Concert",
        "Party",
        "Workshop",
        "Seminar",
        "Exhibition",
        "Trade Show",
        "Networking",
        "Sports Event",
        "Charity Event",
        "Corporate Event",
        "Product Launch",
        "Training",
        "Webinar",
        "Fundraiser",
        "Lecture",
        "Ceremony",
        "Award Show",
        "Recruitment Event",
      ].includes(value)
    );
    setShowBusinessType(value === "Business");
    setShowCustomBusinessType(false);
  };

  const handleBusinessTypeChange = (value) => {
    setFormData({ ...formData, businessType: value, customBusinessType: "" });
    setShowCustomBusinessType(value === "Other");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-7">
          <Typography variant="h5" color="blue-gray">
            Submit New Entry
          </Typography>
          <Select
            color="brown"
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            required
            size="lg"
          >
            <Option value="Business">Business</Option>
            <Option value="Individual">Individual</Option>
            <Option value="Sports Event">Sports Event </Option>
            <Option value="Wedding">Wedding</Option>
            <Option value="Concert">Concert</Option>
            <Option value="Party">Party</Option>
            <Option value="Workshop">Workshop</Option>
            <Option value="Seminar">Seminar</Option>
            <Option value="Trade Show">Trade Show</Option>
            <Option value="Networking">Networking</Option>
            <Option value="Charity Event">Charity Event</Option>
            <Option value="Corporate Event">Corporate Event</Option>
            <Option value="Product Launch">Product Launch</Option>
            <Option value="Training">Training</Option>
            <Option value="Webinar">Webinar</Option>
            <Option value="Fundraiser">Fundraiser</Option>
            <Option value="Lecture">Lecture</Option>
            <Option value="Ceremony">Ceremony</Option>
            <Option value="Award Show">Award Show</Option>
          </Select>
          {showBusinessType && (
            <>
              <Select
                color="brown"
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleBusinessTypeChange}
                required
                size="lg"
              >
                <Option value="Retail">Retail</Option>
                <Option value="Kiosk">Kiosk</Option>
                <Option value="bar">Bar</Option>
                <Option value="Restaurant">Restaurant</Option>
                <Option value="Hotel">Hotel</Option>
                <Option value="Game Center">Game Center</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Healthcare">Healthcare</Option>
                <Option value="Education">Education</Option>
                <Option value="Sports Center">Sports Center</Option>
                <Option value="Event Center">Event Center</Option>
                <Option value="Eatry">Eatry</Option>
                <Option value="Lounge">Lounge</Option>
                <Option value="Agriculture">Agriculture</Option>
                <Option value="Transportation">Transportation</Option>
                <Option value="Entertainment">Entertainment</Option>
                <Option value="Other">Other</Option>
              </Select>
              {showCustomBusinessType && (
                <Input
                  label="Specify Business Type"
                  name="customBusinessType"
                  color="brown"
                  value={formData.customBusinessType}
                  onChange={handleChange}
                  required
                  size="lg"
                />
              )}
            </>
          )}
          <Input
            label="Name or Title"
            name="name"
            color="brown"
            value={formData.name}
            onChange={handleChange}
            required
            size="lg"
          />
          {showDatePicker && (
            <div className="relative">
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                dateFormat="MMMM d, yyyy"
                className="w-full p-2 "
                placeholderText="Select event date"
                wrapperClassName="w-full"
                customInput={
                  <Input label="Event Date" color="brown" readOnly size="lg" />
                }
              />
            </div>
          )}
          <Input
            label="Location"
            name="location"
            color="brown"
            value={formData.location}
            onChange={handleChange}
            required
            size="lg"
          />
          <MapInput />
          <Textarea
            label="Description"
            name="description"
            color="brown"
            value={formData.description}
            onChange={handleChange}
            required
            size="lg"
          />
          <Input
            label="Contact Information"
            name="contact"
            color="brown"
            type="number"
            value={formData.contact}
            onChange={handleChange}
            required
            size="lg"
          />
          <ImageUploader />
        </CardBody>
        <CardFooter>
          <Button type="submit" color="brown" fullWidth>
            Submit Entry
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const AddEvent = () => {
  const [userEntry, setUserEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (formData) => {
    setUserEntry(formData);
    setShowForm(false);
  };

  const handleDelete = () => {
    setUserEntry(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/four.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      <InHeader />
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="mb-8 max-w-3xl text-center mx-auto">
          <h1 className="block font-bold text-brown-700 text-2xl md:text-3xl lg:text-4xl">
            Your Listed Entries
          </h1>
        </div>
        <div className="flex justify-center">
          {userEntry ? (
            <EntryCard entry={userEntry} onDelete={handleDelete} />
          ) : showForm ? (
            <div className="w-full max-w-4xl mx-auto  ">
              <EntryForm onSubmit={handleSubmit} />
            </div>
          ) : (
            // <Card className="w-full max-w-2xl shadow-lg bg-brown-50/90 backdrop-blur-lg">
            //   <CardBody className="flex flex-col items-center justify-center h-64 md:h-96">
            //     <Typography
            //       variant="h4"
            //       color="gray"
            //       className="mb-8 text-center"
            //     >
            //       You haven't created an entry yet.
            //     </Typography>
            //     <Button
            //       color="brown"
            //       size="lg"
            //       className="px-8 py-3 text-lg"
            //       onClick={() => setShowForm(true)}
            //     >
            //       Create Entry
            //     </Button>
            //   </CardBody>
            // </Card>
            <>
              <div class="flex flex-col items-center group/he select-none">
                <div class="relative z-0 h-16 -mb-2 transition-all duration-200 group-hover/he:h-0">
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    class="duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5 animate-[spin_3s_linear_infinite] transition-all"
                  >
                    <svg>
                      <rect width="128" height="128" fill="black"></rect>
                      <circle cx="20" cy="20" r="2" fill="white"></circle>
                      <circle cx="40" cy="30" r="2" fill="white"></circle>
                      <circle cx="60" cy="10" r="2" fill="white"></circle>
                      <circle cx="80" cy="40" r="2" fill="white"></circle>
                      <circle cx="100" cy="20" r="2" fill="white"></circle>
                      <circle cx="120" cy="50" r="2" fill="white"></circle>
                      <circle
                        cx="90"
                        cy="30"
                        r="10"
                        fill="white"
                        fill-opacity="0.5"
                      ></circle>
                      <circle cx="90" cy="30" r="8" fill="white"></circle>
                      <path
                        d="M0 128 Q32 64 64 128 T128 128"
                        fill="purple"
                        stroke="black"
                        stroke-width="1"
                      ></path>
                      <path
                        d="M0 128 Q32 48 64 128 T128 128"
                        fill="mediumpurple"
                        stroke="black"
                        stroke-width="1"
                      ></path>
                      <path
                        d="M0 128 Q32 32 64 128 T128 128"
                        fill="rebeccapurple"
                        stroke="black"
                        stroke-width="1"
                      ></path>
                      <path
                        d="M0 128 Q16 64 32 128 T64 128"
                        fill="purple"
                        stroke="black"
                        stroke-width="1"
                      ></path>
                      <path
                        d="M64 128 Q80 64 96 128 T128 128"
                        fill="mediumpurple"
                        stroke="black"
                        stroke-width="1"
                      ></path>
                    </svg>
                  </svg>
                  <div class="absolute z-10 w-8 h-8 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-12 left-12"></div>
                </div>
                <div class="z-30 flex flex-col w-40 h-20 transition-all duration-300 bg-white shadow-md group-hover/he:h-40 group-hover/he:w-72 rounded-2xl shadow-zinc-400">
                  <div class="flex flex-row w-full h-0 group-hover/he:h-20">
                    <div class="relative flex items-center justify-center w-24 h-24 group-hover/he:-top-6 group-hover/he:-left-4 opacity-0 group-hover/he:animate-[spin_3s_linear_infinite] group-hover/he:opacity-100 transition-all duration-100">
                      <svg
                        width="96"
                        height="96"
                        viewBox="0 0 128 128"
                        class="duration-500 border-4 rounded-full shadow-md border-zinc-400 border-spacing-5"
                      >
                        <svg>
                          <rect width="128" height="128" fill="black"></rect>
                          <circle cx="20" cy="20" r="2" fill="white"></circle>
                          <circle cx="40" cy="30" r="2" fill="white"></circle>
                          <circle cx="60" cy="10" r="2" fill="white"></circle>
                          <circle cx="80" cy="40" r="2" fill="white"></circle>
                          <circle cx="100" cy="20" r="2" fill="white"></circle>
                          <circle cx="120" cy="50" r="2" fill="white"></circle>
                          <circle
                            cx="90"
                            cy="30"
                            r="10"
                            fill="white"
                            fill-opacity="0.5"
                          ></circle>
                          <circle cx="90" cy="30" r="8" fill="white"></circle>
                          <path
                            d="M0 128 Q32 64 64 128 T128 128"
                            fill="purple"
                            stroke="black"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M0 128 Q32 48 64 128 T128 128"
                            fill="mediumpurple"
                            stroke="black"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M0 128 Q32 32 64 128 T128 128"
                            fill="rebeccapurple"
                            stroke="black"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M0 128 Q16 64 32 128 T64 128"
                            fill="purple"
                            stroke="black"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M64 128 Q80 64 96 128 T128 128"
                            fill="mediumpurple"
                            stroke="black"
                            stroke-width="1"
                          ></path>
                        </svg>
                      </svg>
                      <div class="absolute z-10 w-6 h-6 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-9 left-9"></div>
                    </div>
                    <div class="flex flex-col justify-center w-full pl-3 -ml-24 overflow-hidden group-hover/he:-ml-3 text-nowrap">
                      <p class="text-xl font-bold">Empty</p>
                      <p class="text-zinc-600">Juice Wrld</p>
                    </div>
                  </div>
                  <div class="flex flex-row mx-3 mt-3 bg-indigo-100 rounded-md min-h-4 group-hover/he:mt-0">
                    <span class="hidden pl-3 text-sm text-zinc-600 group-hover/he:inline-block">
                      0:00
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="0"
                      class="w-24 group-hover/he:w-full flex-grow h-1 mx-2 my-auto bg-gray-300 rounded-full appearance-none [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:w-3 [&amp;::-webkit-slider-thumb]:h-3 [&amp;::-webkit-slider-thumb]:bg-white [&amp;::-webkit-slider-thumb]:border-2 [&amp;::-webkit-slider-thumb]:border-zinc-400 [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:cursor-pointer [&amp;::-webkit-slider-thumb]:shadow-md"
                    />
                    <span class="hidden pr-3 text-sm text-zinc-600 group-hover/he:inline-block">
                      3:45
                    </span>
                  </div>
                  <div class="flex flex-row items-center justify-center flex-grow mx-3 space-x-5">
                    <label
                      for="playMode"
                      class="flex items-center justify-center w-0 h-full cursor-pointer group-hover/he:w-12"
                    >
                      <input
                        type="checkbox"
                        id="playMode"
                        class="hidden peer/playMode"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#777"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-repeat peer-checked/playMode:hidden"
                      >
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#777"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="hidden feather feather-shuffle peer-checked/playMode:inline-block"
                      >
                        <polyline points="16 3 21 3 21 8"></polyline>
                        <line x1="4" y1="20" x2="21" y2="3"></line>
                        <polyline points="21 16 21 21 16 21"></polyline>
                        <line x1="15" y1="15" x2="21" y2="21"></line>
                        <line x1="4" y1="4" x2="9" y2="9"></line>
                      </svg>
                    </label>
                    <div class="flex items-center justify-center w-12 h-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-skip-back"
                      >
                        <polygon points="19 20 9 12 19 4 19 20"></polygon>
                        <line x1="5" y1="19" x2="5" y2="5"></line>
                      </svg>
                    </div>
                    <label
                      for="playStatus"
                      class="flex items-center justify-center w-12 h-full cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="playStatus"
                        id="playStatus"
                        class="hidden peer/playStatus"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-play peer-checked/playStatus:hidden"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="hidden feather feather-pause peer-checked/playStatus:inline-block"
                      >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    </label>
                    <div class="flex items-center justify-center w-12 h-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-skip-forward"
                      >
                        <polygon points="5 4 15 12 5 20 5 4"></polygon>
                        <line x1="19" y1="5" x2="19" y2="19"></line>
                      </svg>
                    </div>
                    <div class="flex items-center justify-center w-12 h-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#777"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-0 feather feather-list group-hover/he:w-12"
                      >
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>{" "}
        <div className="m-auto w-fit mt-4">
          <Button
            color="brown"
            size="lg"
            className="px-6 py-3 text-md w-fit m-auto justify-center align-middle"
            onClick={() => setShowForm(true)}
          >
            Create Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;