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
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
              </svg> */}
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
