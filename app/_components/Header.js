import React, { useState } from "react";
import axios from "axios";

const Header = ({ setGeoLocation, setIsMyLoc }) => {
  const [city, setCity] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const location = response.data.results[0].geometry.location;
    console.log(location);
    setGeoLocation(location);
    setIsMyLoc(false);
  };

  return (
    <header className="w-full relative">
      <form onSubmit={handleSearch} className="flex items-center gap-2 absolute top-0 right-0">
        <input
          type="text"
          placeholder="검색"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-md px-10 py-1 w-48 text-xs font-normal"
        />
        <button type="submit">
          <img src="/images/search.png" className="w-4 h-4 absolute top-1/2 left-1 -translate-y-1/2" />
        </button>
      </form>
    </header>
  );
};

export default Header;
