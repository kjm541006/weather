import React, { useState } from "react";
import axios from "axios";

const Header = ({ setGeoLocation, setIsMyLoc, isMyLoc, city, setCity }) => {
  const [inputCity, setInputCity] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const location = response.data.results[0].geometry.location;
    console.log(location);
    setGeoLocation(location);
    setIsMyLoc(false);
    setCity(inputCity);
  };

  const resetToPresentLocation = (e) => {
    e.preventDefault();
    if (!isMyLoc) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ lat: latitude, lng: longitude });
        setInputCity("");
        setIsMyLoc(true);
      });
    } else {
      setInputCity("");
    }
  };

  return (
    <header className="w-full relative">
      <form onSubmit={handleSearch} className="flex items-center gap-2 absolute top-0 right-0">
        <input
          type="text"
          placeholder="검색"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="rounded-md px-10 py-1 w-48 text-xs font-normal"
        />
        <button type="submit">
          <img src="/images/search.png" className="w-4 h-4 absolute top-1/2 left-1 -translate-y-1/2" />
          {(!isMyLoc || city.length !== 0) && (
            <div className="w-5 absolute right-1 -translate-y-1/2 -translate-x-1/2" onClick={resetToPresentLocation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
            </div>
          )}
        </button>
      </form>
    </header>
  );
};

export default Header;
