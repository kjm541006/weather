import React, { useState } from "react";
import axios from "axios";

const Header = ({ info }) => {
  const [inputCity, setInputCity] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    let location = "";
    await axios
      .get(`/api/cityInfo?inputCity=${inputCity}`)
      .then((response) => {
        console.log("도시 이름으로 위도 경도 반환");
        location = response.data.results[0].geometry.location;
        console.log(location);
      })
      .catch((error) => {
        alert("도시 및 나라 정보를 찾을 수 없습니다.");
        info.setIsCityExist(false);
        console.log("도시 및 나라 정보를 찾을 수 없음");
        console.log(error);
      });

    console.log(location);
    info.setGeoLocation(location);
    info.setIsMyLoc(false);
    info.setCity(inputCity);
  };

  const resetToPresentLocation = (e) => {
    e.preventDefault();
    if (!info.isMyLoc) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        info.setGeoLocation({ lat: latitude, lng: longitude });
        setInputCity("");
        info.setIsMyLoc(true);
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
          {(!info.isMyLoc || info.city.length !== 0) && (
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
