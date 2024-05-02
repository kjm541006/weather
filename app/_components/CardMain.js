import React, { useEffect, useRef, useState } from "react";
import "./CardMainStyle.css";

const CardMain = ({ info }) => {
  // const countryCode = info.forecastInfo.city.country;
  const timeZone = info.forecastInfo.city?.timezone;
  const [pm10Info, setPm10Info] = useState({});
  const [pm25Info, setPm25Info] = useState({});

  const sunriseString = info?.accuOnedayInfo?.DailyForecasts[0]?.Sun?.Rise;
  const sunriseDate = new Date(sunriseString);
  const sunriseTime = sunriseDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetString = info.accuOnedayInfo?.DailyForecasts[0]?.Sun.Set;
  const sunsetDate = new Date(sunsetString);
  const sunsetTime = sunsetDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const moonriseString = info.accuOnedayInfo?.DailyForecasts[0]?.Moon.Rise;
  const moonriseDate = new Date(moonriseString);
  const moonriseTime = moonriseDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const moonsetString = info.accuOnedayInfo?.DailyForecasts[0]?.Moon.Set;
  const moonsetDate = new Date(moonsetString);
  const moonsetTime = moonsetDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const uvIndex = info.accuOnedayInfo?.DailyForecasts[0]?.AirAndPollen[5].Value;
  let uvColorClass;

  if (uvIndex <= 2) {
    uvColorClass = "text-green-500";
  } else if (uvIndex <= 5) {
    uvColorClass = "text-yellow-500";
  } else if (uvIndex <= 7) {
    uvColorClass = "text-orange-500";
  } else if (uvIndex <= 10) {
    uvColorClass = "text-red-500";
  } else {
    uvColorClass = "text-purple-500";
  }

  useEffect(() => {
    if (info.airpollutionInfo?.list[0].components.pm10 < 30) {
      setPm10Info({ status: "좋음", class: "text-blue-500" });
    } else if (info.airpollutionInfo.list[0].components.pm10 < 80) {
      setPm10Info({ status: "보통", class: "text-black" });
    } else if (info.airpollutionInfo.list[0].components.pm10 < 150) {
      setPm10Info({ status: "나쁨", class: "text-orange-500" });
    } else {
      setPm10Info({ status: "매우 나쁨", class: "text-red-500" });
    }

    if (info.airpollutionInfo?.list[0].components.pm2_5 < 15) {
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
      {info?.isCityExist && (
        <>
          <div className="text-md font-semibold mb-2">예보 ({info.isMyLoc ? "" : info.city + " "}현지 시간 기준)</div>
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
            <div className="row-span-3 col-span-2 bg-blue-400 rounded-md">01</div>
            {/* 일교차 */}
            <div className="col-span-2 bg-blue-400 rounded-md relative">
              <div className="top-1 left-1 absolute text-white text-sm font-semibold">일교차</div>
              <div className="flex items-center justify-center h-full pt-4">
                <div className="flex-1 text-center">
                  <div>최고기온</div>
                  <div className="font-semibold text-lg my-2">
                    {Math.round(info.accuOnedayInfo.DailyForecasts[0].Temperature.Maximum.Value)}°C
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div>최저기온</div>
                  <div className="font-semibold text-lg my-2">
                    {Math.round(info.accuOnedayInfo.DailyForecasts[0].Temperature.Minimum.Value)}°C
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-2 col-span-2 bg-red-400 rounded-md">02</div>
            {/* 미세먼지 정보 */}
            <div className="col-span-2 bg-blue-400 rounded-md relative">
              <div className="top-1 left-1 absolute text-white text-sm font-semibold">미세먼지 정보</div>
              <div className="flex items-center justify-center h-full pt-4">
                <div className="flex-1 text-center">
                  <div className="">미세먼지</div>
                  <div className={`font-semibold text-lg my-2 ${pm10Info.class}`}>{pm10Info.status}</div>
                  <div>{info.airpollutionInfo.list[0].components.pm10}㎍/㎥</div>
                </div>
                <div className="flex-1 text-center">
                  <div>초미세먼지</div>
                  <div className={`font-semibold text-lg my-2 ${pm25Info.class}`}>{pm25Info.status}</div>
                  <div>{info.airpollutionInfo.list[0].components.pm2_5}㎍/㎥</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">습도</div>
              <div className="text-white text-3xl font-medium mt-1 ml-3">{info.weatherInfo.temperature.humidity}%</div>
            </div>
            <div className="bg-blue-400 rounded-md relative">
              <div className="text-white text-sm font-semibold mt-1 ml-1">최고 자외선 지수</div>
              <div className={`text-white text-3xl font-semibold mt-1 ml-3 mb-6 ${uvColorClass}`}>
                {info.accuOnedayInfo.DailyForecasts[0].AirAndPollen[5].Value}
              </div>
              <div className={`text-white text-sm font-semibold mt-1 ml-3 absolute bottom-1`}>
                {info.accuOnedayInfo.DailyForecasts[0].AirAndPollen[5].Category}
              </div>
            </div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">강수확률</div>
              <div className="text-white text-3xl font-medium mt-1 ml-3">
                {Math.round(info.accuOnedayInfo.DailyForecasts[0].Day.RainProbability) + "%"}
              </div>
            </div>
            {/* 체감온도 */}
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">체감온도</div>
              <div className="text-white text-3xl font-medium mt-1 ml-3">{Math.round(info.weatherInfo.temperature.feels_like) + "°C"}</div>
            </div>
            <div className="col-span-2 bg-red-400 rounded-md">정사각형</div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">일출</div>
              <div className="text-white text-2xl font-medium mt-1 ml-3">{sunriseTime}</div>
            </div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">일몰</div>
              <div className="text-white text-2xl font-medium mt-1 ml-3">{sunsetTime}</div>
            </div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">강수량</div>
              <div className="text-white text-2xl font-medium mt-1 ml-3">{info.accuOnedayInfo.DailyForecasts[0].Day.HoursOfRain}</div>
            </div>
            <div className="bg-blue-400 rounded-md">
              <div className="text-white text-sm font-semibold mt-1 ml-1">월몰</div>
              <div className="text-white text-2xl font-medium mt-1 ml-3">{moonsetTime}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardMain;
