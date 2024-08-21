import React, { useState, useRef, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { MapPin, X, FloppyDisk } from "@phosphor-icons/react";

const MapInput = ({ onLocationSelect }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestedNames, setSuggestedNames] = useState([]);
  const [savedLocation, setSavedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const JALINGO_COORDINATES = { lat: 8.8932, lng: 11.3667 };

  useEffect(() => {
    if (showMap && !mapRef.current) {
      mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center: JALINGO_COORDINATES,
        zoom: 12,
        mapTypeId: "satellite",
      });

      mapRef.current.addListener("click", (e) => {
        handleMapClick(e.latLng);
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [showMap]);

  const handleMapClick = (latLng) => {
    const { lat, lng } = latLng.toJSON();
    setSelectedLocation({ lat, lng });

    if (markerRef.current) markerRef.current.setMap(null);
    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapRef.current,
    });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const names = results
          .map((result) => result.formatted_address)
          .slice(0, 3);
        setSuggestedNames(names);

        if (onLocationSelect) {
          onLocationSelect({ lat, lng });
        }
      }
    });
  };

  const handleSaveLocation = () => {
    if (selectedLocation && suggestedNames.length > 0) {
      setSavedLocation({
        coordinates: selectedLocation,
        name: suggestedNames[0],
      });
      setShowMap(false);
      setSuggestedNames([]);
      setSelectedLocation(null);
    }
  };

  return (
    <>
      <div
        className="flex items-center p-0 -mt-4 bg-white w-fit cursor-pointer hover:bg-brown-50 rounded-xl"
        onClick={() => setShowMap(!showMap)}
      >
        <Typography className="text-brown-800 ml-2 ">
          {showMap
            ? "Close Map"
            : savedLocation
            ? savedLocation.name
            : "Set Exact Location From Map"}
        </Typography>
        <div className="rounded p-2 text-brown-600">
          {showMap ? <X size={20} /> : <MapPin size={20} />}
        </div>
      </div>
      {showMap && (
        <Card className="p-1 bg-brown-50 -mt-4">
          <div className="relative h-96 mb-4">
            <div ref={mapContainerRef} className="absolute inset-0" />
          </div>
        </Card>
      )}
      {selectedLocation && (
        <div className="mt-2">
          <Typography className="text-brown-800">
            Selected Location: {selectedLocation.lng.toFixed(6)},{" "}
            {selectedLocation.lat.toFixed(6)}
          </Typography>
          {suggestedNames.length > 0 && (
            <div className="mt-2">
              <Typography className="text-brown-800 font-semibold">
                Suggested Names:
              </Typography>
              <ul className="list-disc pl-5">
                {suggestedNames.map((name, index) => (
                  <li key={index} className="text-brown-700">
                    {name}
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                color="brown"
                className="mt-2 flex justify-center text-center"
                onClick={handleSaveLocation}
              >
                <FloppyDisk size={17} className="mr-2" />
                Save Location
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MapInput;
