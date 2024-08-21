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
} from "@phosphor-icons/react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InHeader } from "../components/inheader";
import MapInput from "../components/location";
import ImageUploader from "../components/imageupload";

const EntryCard = ({ entry, onDelete }) => (
  <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{entry.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{entry.category}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
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
      <div className="px-6 pb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Photos</h3>
        <div className="flex flex-wrap gap-2">
          {entry.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Entry photo ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>
    )}

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
    <Card className="w-full max-w-[24rem] shadow-lg">
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
        <div className="mb-4 max-w-3xl text-center mx-auto">
          <h1 className="block font-bold text-brown-700 text-2xl md:text-3xl ">
            Your Listed Entries
          </h1>
        </div>
        <div className="flex justify-center">
          {userEntry ? (
            <EntryCard entry={userEntry} onDelete={handleDelete} />
          ) : showForm ? (
            <EntryForm onSubmit={handleSubmit} />
          ) : (
            <Card className="w-full max-w-[24rem] shadow-lg bg-brown-50 backdrop-blur-lg">
              <CardBody className="flex flex-col items-center justify-center h-64">
                <Typography variant="h6" color="gray" className="mb-8">
                  You haven't created an entry yet.
                </Typography>
                <Button color="brown" onClick={() => setShowForm(true)}>
                  Create Entry
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
