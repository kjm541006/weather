import React, { useState } from "react";
import axios from "axios";

const Header = ({ setGeoLocation }) => {
  const [city, setCity] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const location = response.data.results[0].geometry.location;
    console.log(location);
    setGeoLocation(location);
  };

  return (
    <header>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="검색어를 입력하세요" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
