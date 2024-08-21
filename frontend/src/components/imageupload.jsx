import React, { useState, useRef } from "react";
import { Camera, Plus } from "@phosphor-icons/react";

const ImageUploader = () => {
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));

    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos, ...newPhotos].slice(0, 5);
      return updatedPhotos;
    });
  };

  const handleAddMore = (e) => {
    e.preventDefault(); // Prevent form submission
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Camera size={20} className="text-brown-500" />
          <span className="text-[14px]">Upload Photos (max 5)</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 items-center">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Upload preview ${index + 1}`}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
        {photos.length >= 0 && photos.length < 5 && (
          <button
            onClick={handleAddMore}
            className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            <Plus size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
