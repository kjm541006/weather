import React, { useEffect, useState } from "react";
// import "./Card.css";

const Card = ({ info }) => {
  const cityInfo = info.city;
  return (
    <div className="flex flex-col mx-auto my-0 w-128 mt-12 items-center justify-center">
      <h1 className="font-bold text-center text-2xl mb-1">{info.isMyLoc ? "나의 위치" : info.isCityExist ? cityInfo : "위치 정보 없음"}</h1>
      {info.isCityExist ? (
        <>
          <h2 className="mb-2">{info.locInfo.city}</h2>
          <p className="text-4xl">{Math.round(info.weatherInfo.temperature) + "°C" || "알 수 없음"}</p>
          <p>{info.weatherInfo.weather || "알 수 없음"}</p>{" "}
        </>
      ) : (
        <p>도시 및 국가를 찾지 못했습니다.</p>
      )}
      {/* <h1>현재 위치</h1>
      <p>위도: {info.geoLocation.lat}</p>
      <p>경도: {info.geoLocation.lng}</p>
      <p>도시: {info.locInfo.city || "알 수 없음"}</p>
      <p>국가: {info.locInfo.country || "알 수 없음"}</p> */}
    </div>
  );
};

export default Card;
