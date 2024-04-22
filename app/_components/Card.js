import React, { useEffect, useState } from "react";
// import "./Card.css";

const Card = ({ info }) => {
  return (
    <div className="card">
      <h1>날씨 정보</h1>
      <p>오늘의 날씨는 {info.weatherInfo.weather || "알 수 없음"}입니다.</p>
      <p>오늘의 기온은 {info.weatherInfo.temperature || "알 수 없음"}°C입니다.</p>
      <h1>현재 위치</h1>
      <p>위도: {info.geoLocation.lat}</p>
      <p>경도: {info.geoLocation.lng}</p>
      <p>도시: {info.locInfo.city || "알 수 없음"}</p>
      <p>국가: {info.locInfo.country || "알 수 없음"}</p>
    </div>
  );
};

export default Card;
