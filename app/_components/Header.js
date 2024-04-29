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
    info.setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      info.setGeoLocation({ lat: latitude, lng: longitude });
      setInputCity("");
      info.setIsCityExist(true);
      info.setIsMyLoc(true);
    });
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
          <img src="/images/search.png" className="w-4 h-4 absolute top-1/2 left-1 -translate-y-1/2" alt="도시 및 국가 검색" />
          {!info.isMyLoc && (
            <div className="w-3.5 absolute right-1 -translate-y-1/2 -translate-x-1/2" onClick={resetToPresentLocation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <title>현재 위치로 돌아가기</title>
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
            </div>
          )}
        </button>
      </form>
    </header>
  );
};

export default Header;
