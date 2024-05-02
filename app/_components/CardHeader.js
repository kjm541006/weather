import React from "react";

const CardHeader = ({ info }) => {
  const cityInfo = info.city;
  return (
    <div className="flex flex-col mx-auto my-0 w-128 mt-12 items-center justify-center">
      <h1 className="font-bold text-center text-2xl mb-1">{info.isMyLoc ? "나의 위치" : info.isCityExist ? cityInfo : "위치 정보 없음"}</h1>
      {info.isCityExist ? (
        <>
          <h2>{info.locInfo.city}</h2>
          {info.isMyLoc && <h2>{info.accuLocInfo}</h2>}
          {/* <p>{info.weatherInfo.weather || "알 수 없음"}</p>{" "} */}
          {info.weatherInfo.weather === "Clouds" && <img src="/images/clouds.png" className="w-32 h-32" alt="구름" />}
          {info.weatherInfo.weather === "Snow" && <img src="/images/snow.png" className="w-32 h-32" alt="눈" />}
          {info.weatherInfo.weather === "Clear" && <img src="/images/clear.png" className="w-32 h-32" alt="맑음" />}
          {info.weatherInfo.weather === "Rain" && <img src="/images/rain.png" className="w-32 h-32" alt="비" />}
          {info.weatherInfo.weather === "Drizzle" && <img src="/images/drizzle.png" className="w-32 h-32" alt="이슬비" />}
          {/* {info.weatherInfo.weather === "Clouds" && <img src="/images/clouds.png" className="w-32 h-32" alt="구름" />} */}
          {/* {info.weatherInfo.weather === "Clouds" && <img src="/images/clouds.png" className="w-32 h-32" alt="구름" />} */}
          <p className="text-4xl">{Math.round(info.weatherInfo.temperature.temp) + "°C" || "알 수 없음"}</p>
        </>
      ) : (
        <p>도시 및 국가를 찾지 못했습니다.</p>
      )}
    </div>
  );
};

export default CardHeader;
