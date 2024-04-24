import React from "react";

const CardMain = ({ info }) => {
  return (
    <>
      {info.isCityExist && (
        <>
          <div className="text-lg font-bold mb-2">예보</div>
          <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide bg-blue-500">
            {info.forecastInfo?.map((forecast) => {
              const dateString = forecast.dt;
              const date = new Date(dateString * 1000);
              const day = date.toLocaleDateString("ko-KR", { day: "numeric" });
              const hour = date.toLocaleTimeString("ko-KR", { hour: "2-digit", hour12: true });
              return (
                <div key={forecast.dt} className="">
                  {/* <div>시간 : {forecast.dt_txt}</div> */}
                  <div>시간 : {`${day} ${hour}`}</div>
                  <div>기온 : {Math.round(forecast.main.temp)}°C</div>
                  <div>체감 : {Math.round(forecast.main.feels_like)}°C</div>
                  <div>습도 : {Math.round(forecast.main.humidity)}%</div>
                  <div>날씨 : {forecast.weather[0].main}</div>
                  <div>풍향 : {forecast.wind.deg}°</div>
                  <br />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CardMain;
