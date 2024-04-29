import React from "react";
import "./CardMainStyle.css";

const CardMain = ({ info }) => {
  const countryCode = info.forecastInfo.city.country;
  const timeZone = info.forecastInfo.city.timezone;
  return (
    <>
      {info.isCityExist && (
        <>
          <div className="text-lg font-bold mb-2">예보 ({info.isMyLoc ? "" : info.city + " "}현지 시간 기준)</div>
          <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar bg-blue-300 rounded-md">
            {info.forecastInfo.list.map((forecast) => {
              // 밀리초 단위의 Unix 타임스탬프를 Date 객체로 변환
              const dateObject = new Date((forecast.dt + timeZone) * 1000);

              // Date 객체를 특정 시간대의 날짜와 시간으로 변환
              const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
                weekday: "short",
                day: "numeric",
                hour: "2-digit",
                hour12: false,
                timeZone: "UTC",
              });
              const [{ value: weekday }, , { value: day }, , { value: hour }] = dateTimeFormat.formatToParts(dateObject);

              return (
                <div key={forecast.dt} className="flex flex-col items-center gap-3 mx-8 my-4">
                  {/* <div>시간 : {forecast.dt_txt}</div> */}
                  <div className="text-white font-semibold text-md">{`${weekday}일(${day}) ${hour}시`}</div>
                  <div className="text-sm">기온 : {Math.round(forecast.main.temp)}°C</div>
                  <div className="text-sm">체감 : {Math.round(forecast.main.feels_like)}°C</div>
                  <div className="text-sm">습도 : {Math.round(forecast.main.humidity)}%</div>
                  <div className="text-sm">날씨 : {forecast.weather[0].main}</div>
                  <div className="text-sm">풍향 : {forecast.wind.deg}°</div>
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
