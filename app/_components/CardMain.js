import React from "react";

const CardMain = ({ info }) => {
  return (
    <>
      <div>예보</div>
      {info.forecastInfo?.map((forecast) => {
        console.log(forecast);
        return (
          <div key={forecast.dt}>
            <div>시간 : {forecast.dt_txt}</div>
            <div>기온 : {Math.round(forecast.main.temp)}°C</div>
            <div>체감 : {Math.round(forecast.main.feels_like)}°C</div>
            <div>습도 : {Math.round(forecast.main.humidity)}%</div>
            <div>날씨 : {forecast.weather[0].main}</div>
            <div>풍향 : {forecast.wind.deg}°</div>

            <br />
          </div>
        );
      })}
    </>
  );
};

export default CardMain;
