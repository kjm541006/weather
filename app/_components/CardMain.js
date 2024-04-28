import React from "react";
import "./CardMainStyle.css";

const CardMain = ({ info }) => {
  const countryCode = info.forecastInfo.city.country;
  const timeZone = info.forecastInfo.city.timezone;
  return (
    <>
      {info.isCityExist && (
        <>
<<<<<<< HEAD
          <div className="text-lg font-bold mb-2">예보</div>
          <div className="flex gap-6 overflow-x-auto whitespace-nowrap bg-blue-300 rounded-lg p-4 pb-3 scrollbar">
            {info.forecastInfo?.map((forecast) => {
              const dateString = forecast.dt;
              const date = new Date(dateString * 1000);
              const day = date.toLocaleDateString("ko-KR", { day: "numeric" });
              const hour = date.toLocaleTimeString("ko-KR", { hour: "2-digit", hour12: true });
=======
          <div className="text-lg font-bold mb-2">예보 (시간은 로컬타임 입니다)</div>
          <div className="flex gap-6 overflow-x-auto whitespace-nowrap bg-blue-300 rounded-md p-4 pb-3 scrollbar">
            {info.forecastInfo.list.map((forecast) => {
              // const dateString = forecast.dt;
              // const date = new Date((dateString + timeZone) * 1000);
              // const day = date.toUTCString("ko-KR", { day: "numeric" });
              // const hour = date.toUTCString("ko-KR", { hour: "2-digit", hour12: false });
              // const unixTimestamp = forecast.dt;
              // const milliseconds = unixTimestamp * 1000;

              // 밀리초 단위의 Unix 타임스탬프를 Date 객체로 변환
              const dateObject = new Date((forecast.dt + timeZone) * 1000);

              // Date 객체를 특정 시간대의 날짜와 시간으로 변환
              const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
                day: "numeric",
                hour: "2-digit",
                hour12: false,
                timeZone: "UTC",
              });
              const [{ value: day }, , { value: hour }] = dateTimeFormat.formatToParts(dateObject);

>>>>>>> 59e94c64fcfea51296432ee9d39cdbf2916f98e0
              return (
                <div key={forecast.dt} className="flex flex-col items-center gap-3 mx-8 my-4">
                  {/* <div>시간 : {forecast.dt_txt}</div> */}
                  <div className="text-white font-semibold text-lg">{`${day}일 ${hour}시`}</div>
                  <div>기온 : {Math.round(forecast.main.temp)}°C</div>
                  <div>체감 : {Math.round(forecast.main.feels_like)}°C</div>
                  <div>습도 : {Math.round(forecast.main.humidity)}%</div>
                  <div>날씨 : {forecast.weather[0].main}</div>
                  <div>풍향 : {forecast.wind.deg}°</div>
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
