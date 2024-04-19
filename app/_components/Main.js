import { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [geoLocation, setGeoLocation] = useState({});
  const [locInfo, setLocInfo] = useState({}); // [city, country]
  const [weatherInfo, setWeatherInfo] = useState({}); // [temperature, weather]
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("위치 정보를 사용할 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (geoLocation) {
      const latitude = geoLocation.latitude;
      const longitude = geoLocation.longitude;

      if (latitude && longitude) {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=country|locality&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          )
          .then((response) => {
            console.log(response.data);
            setLocInfo({
              city: response.data.results[0]?.formatted_address,
              country: response.data.results[response.data.results.length - 1]?.formatted_address,
            });
          })
          .then((error) => {
            console.log(error);
          });

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
          )
          .then((response) => {
            console.log(response.data);
            setWeatherInfo({
              temperature: response.data.main.temp,
              weather: response.data.weather[0].main,
            });
          })
          .then((error) => {
            console.log(error);
          });
      }
    }
  }, [geoLocation]);

  return (
    <div>
      <h1>날씨 정보</h1>
      <p>오늘의 날씨는 {weatherInfo.weather || "알 수 없음"}입니다.</p>
      <p>오늘의 기온은 {weatherInfo.temperature || "알 수 없음"}°C입니다.</p>
      <h1>현재 위치</h1>
      <p>위도: {geoLocation.latitude}</p>
      <p>경도: {geoLocation.longitude}</p>
      <p>도시: {locInfo.city || "알 수 없음"}</p>
      <p>국가: {locInfo.country || "알 수 없음"}</p>
    </div>
  );
}
