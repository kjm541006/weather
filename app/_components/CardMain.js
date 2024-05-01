import React, { useEffect, useRef, useState } from "react";
import "./CardMainStyle.css";

const CardMain = ({ info }) => {
  const countryCode = info.forecastInfo.city.country;
  const timeZone = info.forecastInfo.city.timezone;
  const [pm10Info, setPm10Info] = useState({});
  const [pm25Info, setPm25Info] = useState({});

  useEffect(() => {
    if (info.airpollutionInfo.list[0].components.pm10 < 30) {
      setPm10Info({ status: "좋음", class: "text-blue-500" });
    } else if (info.airpollutionInfo.list[0].components.pm10 < 80) {
      setPm10Info({ status: "보통", class: "text-black" });
    } else if (info.airpollutionInfo.list[0].components.pm10 < 150) {
      setPm10Info({ status: "나쁨", class: "text-orange-500" });
    } else {
      setPm10Info({ status: "매우 나쁨", class: "text-red-500" });
    }

    if (info.airpollutionInfo.list[0].components.pm2_5 < 15) {
      setPm25Info({ status: "좋음", class: "text-blue-500" });
    } else if (info.airpollutionInfo.list[0].components.pm2_5 < 35) {
      setPm25Info({ status: "보통", class: "text-black" });
    } else if (info.airpollutionInfo.list[0].components.pm2_5 < 75) {
      setPm25Info({ status: "나쁨", class: "text-orange-500" });
    } else {
      setPm25Info({ status: "매우 나쁨", class: "text-red-500" });
    }
  }, [info.airpollutionInfo]);

  const scrollbarRef = useRef();
  useEffect(() => {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      scrollbarRef.current.classList.add("safari");
    } else {
      scrollbarRef.current.classList.add("not-safari");
    }
  }, []);

  return (
    <>
      {info.isCityExist && (
        <>
          <div className="text-md font-bold mb-2">예보 ({info.isMyLoc ? "" : info.city + " "}현지 시간 기준)</div>
          <div ref={scrollbarRef} className="flex gap-1 overflow-x-auto whitespace-nowrap scrollbar bg-blue-300 rounded-md">
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
                <div key={forecast.dt} className="flex flex-col items-center gap-2 mx-4 my-4">
                  {/* <div>시간 : {forecast.dt_txt}</div> */}
                  <div className="text-white font-semibold text-md">{`${weekday}일(${day}) ${hour}시`}</div>
                  {forecast.weather[0].main === "Clouds" && <img src="/images/clouds.png" className="w-16 h-16" alt="구름" />}
                  {forecast.weather[0].main === "Snow" && <img src="/images/snow.png" className="w-16 h-16" alt="눈" />}
                  {forecast.weather[0].main === "Clear" && <img src="/images/clear.png" className="w-16 h-16" alt="맑음" />}
                  {forecast.weather[0].main === "Rain" && <img src="/images/rain.png" className="w-16 h-16" alt="비" />}
                  {forecast.weather[0].main === "Drizzle" && <img src="/images/drizzle.png" className="w-16 h-16" alt="이슬비" />}
                  <div className="text-md text-white">{Math.round(forecast.main.temp)}°C</div>
                  {/* <div className="text-sm">체감 : {Math.round(forecast.main.feels_like)}°C</div> */}
                  {/* <div className="text-sm">습도 : {Math.round(forecast.main.humidity)}%</div> */}
                  {/* <div className="text-sm">날씨 : {forecast.weather[0].main}</div> */}
                  {/* <div className="text-sm">풍향 : {forecast.wind.deg}°</div> */}
                </div>
              );
            })}
          </div>
          <div className="w-full h-[40rem] grid grid-rows-4 grid-cols-6 gap-4 mt-4">
            <div className="row-span-3 col-span-2 bg-red-400 rounded-md">01</div>
            <div className="col-span-2 bg-blue-300 rounded-md relative">
              <div className="top-1 left-2 absolute text-white text-sm">미세먼지 정보</div>
              <div className="flex items-center justify-center h-full pt-4">
                <div className="flex-1 text-center">
                  <div className="">미세먼지</div>
                  <div className={`font-bold text-lg my-2 ${pm10Info.class}`}>{pm10Info.status}</div>
                  <div>{info.airpollutionInfo.list[0].components.pm10}㎍/㎥</div>
                </div>
                <div className="flex-1 text-center">
                  <div>초미세먼지</div>
                  <div className={`font-bold text-lg my-2 ${pm25Info.class}`}>{pm25Info.status}</div>
                  <div>{info.airpollutionInfo.list[0].components.pm2_5}㎍/㎥</div>
                </div>
              </div>
            </div>
            <div className="row-span-2 col-span-2 bg-red-400 rounded-md">02</div>
            <div className="col-span-2 bg-red-400 rounded-md">바람</div>
            <div className="bg-red-400 rounded-md">자외선</div>
            <div className="bg-red-400 rounded-md">강수량</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
            <div className="col-span-2 bg-red-400 rounded-md">정사각형</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
            <div className="bg-red-400 rounded-md">정사각형</div>
          </div>
        </>
      )}
    </>
  );
};

export default CardMain;
