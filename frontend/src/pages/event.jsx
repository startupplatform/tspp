import React, { useState } from "react";
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
  Plus,
  ArrowLeft,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InHeader } from "../components/inheader";
import ImageUploader from "../components/imageupload";

const EntryCard = ({ entry, onDelete, onEdit }) => (
  <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg border border-gray-100">
    <div className="md:flex">
      <div className="md:w-2/3 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Typography variant="h4" color="brown" className="font-bold">
              {entry.name}
            </Typography>
            <Typography variant="small" color="brown" className="mt-1">
              {entry.category}
              {entry.businessType && ` • ${entry.businessType}`}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outlined"
              color="brown"
              className="flex items-center gap-2"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outlined"
              color="red"
              className="flex items-center gap-2"
              onClick={onDelete}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <MapPin size={20} className="text-brown-500 mr-2" />
            <Typography variant="small" className="text-gray-700">
              {entry.location}
            </Typography>
          </div>
          {entry.contact && (
            <div className="flex items-center">
              {entry.contact.includes("@") ? (
                <EnvelopeSimple size={20} className="text-brown-500 mr-2" />
              ) : (
                <Phone size={20} className="text-brown-500 mr-2" />
              )}
              <Typography variant="small" className="text-gray-700">
                {entry.contact}
              </Typography>
            </div>
          )}
          {entry.website && (
            <div className="flex items-center">
              <Globe size={20} className="text-brown-500 mr-2" />
              <a
                href={entry.website}
                className="text-sm text-brown-500 hover:underline"
              >
                {entry.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {entry.date && (
            <div className="flex items-center">
              <Calendar size={20} className="text-brown-500 mr-2" />
              <Typography variant="small" className="text-gray-700">
                {format(new Date(entry.date), "MMM d, yyyy")}
              </Typography>
            </div>
          )}
        </div>

        <Typography className="text-gray-700 mb-4">
          {entry.description}
        </Typography>
      </div>

      {entry.photos && entry.photos.length > 0 && (
        <div className="md:w-1/3 bg-gray-50 p-6">
          <Typography variant="h6" className="font-medium text-gray-800 mb-3">
            Photos
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            {entry.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Entry photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-md shadow-sm"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  </Card>
);

const EntryForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
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
    }
  );
  const [showBusinessType, setShowBusinessType] = useState(
    initialData?.category === "Business"
  );
  const [showCustomBusinessType, setShowCustomBusinessType] = useState(
    initialData?.businessType === "Other"
  );

  const isEventCategory = [
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
  ].includes(formData.category);

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
    <Card className="w-full max-w-4xl mx-auto shadow-lg border border-gray-100 mt-[-30px] md:mt-[-10px] ">
      <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="h5" color="brown">
              {initialData ? "Edit Entry" : "Create New Entry"}
            </Typography>
            <Button
              variant="text"
              color="brown"
              className="flex items-center gap-2"
              onClick={onCancel}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                color="brown"
                className="mb-4"
              >
                <Option value="Business">Business</Option>
                <Option value="Individual">Individual</Option>
                <Option value="Sports Event">Sports Event</Option>
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
              <br />

              {showBusinessType && (
                <>
                  <Select
                    label="Business Type"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleBusinessTypeChange}
                    required
                    color="brown"
                    className="mb-4"
                  >
                    <Option value="Retail">Retail</Option>
                    <Option value="Kiosk">Kiosk</Option>
                    <Option value="Bar">Bar</Option>
                    <Option value="Restaurant">Restaurant</Option>
                    <Option value="Hotel">Hotel</Option>
                    <Option value="Game Center">Game Center</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Healthcare">Healthcare</Option>
                    <Option value="Education">Education</Option>
                    <Option value="Sports Center">Sports Center</Option>
                    <Option value="Event Center">Event Center</Option>
                    <Option value="Eatery">Eatery</Option>
                    <Option value="Lounge">Lounge</Option>
                    <Option value="Agriculture">Agriculture</Option>
                    <Option value="Transportation">Transportation</Option>
                    <Option value="Entertainment">Entertainment</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                  <br />
                </>
              )}

              {showCustomBusinessType && (
                <>
                  <Input
                    label="Specify Business Type"
                    name="customBusinessType"
                    value={formData.customBusinessType}
                    onChange={handleChange}
                    required
                    color="brown"
                    className="mb-4"
                  />
                  <br />
                </>
              )}

              <Input
                label="Name or Title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                color="brown"
                className="mb-4"
              />
              <br />

              {isEventCategory && (
                <div className="mb-4">
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    dateFormat="MMMM d, yyyy"
                    className="w-full"
                    placeholderText="Select event date"
                    customInput={
                      <Input label="Event Date" color="brown" readOnly />
                    }
                  />
                </div>
              )}

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                color="brown"
                className="mb-4"
              />
            </div>

            <div>
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                color="brown"
                className="mb-4"
                rows={4}
              />

              <Input
                label="Contact Information"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                color="brown"
                className="mb-4"
              />
              <br />

              <Input
                label="Website (optional)"
                name="website"
                value={formData.website}
                onChange={handleChange}
                color="brown"
                className="mb-4"
              />

              <div className="mt-2">
                <Typography
                  variant="small"
                  className="mb-2 text-gray-700 font-medium"
                >
                  Upload Photos
                </Typography>
                <ImageUploader
                  onImagesChange={(photos) =>
                    setFormData({ ...formData, photos })
                  }
                  initialImages={formData.photos}
                />
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" color="brown" fullWidth className="mt-4">
            {initialData ? "Save Changes" : "Submit Entry"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const EmptyState = ({ onCreateEntry }) => (
  <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border border-gray-100">
    <CardBody className="flex flex-col items-center justify-center py-16">
      <div className="w-24 h-24 mb-6 bg-brown-50 rounded-full flex items-center justify-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brown-500"
        >
          <path
            d="M12 7V17M7 12H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Typography variant="h4" className="mb-2 text-center">
        No Entries Yet
      </Typography>
      <Typography className="mb-8 text-center text-gray-600 max-w-md">
        Get started by creating your first entry. Add details about your
        business, event, or any listing you want to showcase.
      </Typography>
      <Button
        size="lg"
        color="brown"
        className="px-6 flex items-center gap-2"
        onClick={onCreateEntry}
      >
        <Plus size={20} />
        Create Entry
      </Button>
    </CardBody>
  </Card>
);

const AddEvent = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreateEntry = () => {
    setCurrentEntry(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditEntry = (entry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      // Update existing entry
      const updatedEntries = entries.map((entry) =>
        entry === currentEntry ? formData : entry
      );
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, formData]);
    }
    setShowForm(false);
    setCurrentEntry(formData);
  };

  const handleDelete = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry !== entryToDelete);
    setEntries(updatedEntries);
    if (updatedEntries.length > 0) {
      setCurrentEntry(updatedEntries[0]);
    } else {
      setCurrentEntry(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Render content based on state
  const renderContent = () => {
    if (showForm) {
      return (
        <EntryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={isEditing ? currentEntry : null}
        />
      );
    }

    if (entries.length === 0 && !currentEntry) {
      return <EmptyState onCreateEntry={handleCreateEntry} />;
    }

    return (
      <div className="space-y-6">
        {currentEntry && (
          <EntryCard
            entry={currentEntry}
            onDelete={() => handleDelete(currentEntry)}
            onEdit={() => handleEditEntry(currentEntry)}
          />
        )}

        {entries.length > 0 && (
          <div className="text-center mt-6">
            <Button
              color="brown"
              variant="outlined"
              size="lg"
              className="px-6 flex items-center gap-2 mx-auto"
              onClick={handleCreateEntry}
            >
              <Plus size={20} />
              Create Another Entry
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-gradient-to-b from-brown-50 to-brown-100"
      style={{
        backgroundImage: "url('/four.jpg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      <InHeader />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* <div className="mb-12 max-w-3xl text-center mx-auto">
          <Typography
            variant="h2"
            className="font-bold text-brown-800 mb-3"
          >
            Your Listings
          </Typography>
          <Typography className="text-brown-600 max-w-2xl mx-auto">
            Create and manage your entries. Add detailed information, upload
            photos, and showcase your listings to the world.
          </Typography>
        </div> */}

        {renderContent()}
      </div>
    </div>
  );
};

export default AddEvent;
