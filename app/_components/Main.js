import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Header from "./Header";

export default function Main() {
  const [isMyLoc, setIsMyLoc] = useState(true);
  const [geoLocation, setGeoLocation] = useState({});
  const [locInfo, setLocInfo] = useState({}); // [city, country]
  const [weatherInfo, setWeatherInfo] = useState({}); // [temperature, weather]
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("위치 정보를 사용할 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (geoLocation) {
      const lat = geoLocation.lat;
      const lng = geoLocation.lng;

      if (lat && lng) {
        // 도시 국가 정보 받아오기
        const fetchWeather = async () => {
          axios
            .get(
              // map -> maps
              `https://map.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=country|locality&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
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
          // 위도 경도로 날씨 정보 받아오기
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
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
        };
        fetchWeather();
      }
    }
  }, [geoLocation]);

  return (
    <div className="mx-auto my-0">
      {/* weatherInfo.temperature */}
      {true ? (
        <div className="px-6 py-3">
          <Header setGeoLocation={setGeoLocation} setIsMyLoc={setIsMyLoc} />
          <Card info={{ geoLocation, locInfo, weatherInfo, isMyLoc }} className="flex items-center justify-center" />
        </div>
      ) : (
        <div>로딩</div>
      )}
    </div>
  );
}
