import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Header from "./Header";
import Loading from "./Loading";

export default function Main() {
  const [isMyLoc, setIsMyLoc] = useState(true);
  const [geoLocation, setGeoLocation] = useState({});
  const [locInfo, setLocInfo] = useState({}); // [city, country]
  const [weatherInfo, setWeatherInfo] = useState({}); // [temperature, weather]
  const [forecastInfo, setForecastInfo] = useState({});
  const [city, setCity] = useState("");
  const [isCityExist, setIsCityExist] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
        // const fetchWeather = async () => {
        //   axios
        //     .get(`api/geoInfo?lat=${lat}&lng=${lng}`)
        //     .then((response) => {
        //       console.log("위도 경도로 도시 및 국가 주소 정보 받아오기 google geolocation");
        //       console.log(response.data);
        //       setLocInfo({
        //         city: response.data.results[0]?.formatted_address,
        //         country: response.data.results[response.data.results.length - 1]?.formatted_address,
        //       });
        //     })
        //     .catch((error) => {
        //       console.log(error + "에러발생");
        //     });
        //   // 위도 경도로 날씨 정보 받아오기
        //   axios
        //     .get(`/api/weatherInfo?lat=${lat}&lng=${lng}`)
        //     .then((response) => {
        //       console.log("위도 경도로 날씨 정보 받아오기 openweathermap");
        //       console.log(response.data);
        //       setWeatherInfo({
        //         temperature: response.data.main.temp,
        //         weather: response.data.weather[0].main,
        //       });
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        //   // 위도 경도로 날씨 예보 (5일 3시간 간격 정보) 받아오기
        //   axios
        //     .get(`/api/forecastInfo?lat=${lat}&lng=${lng}`)
        //     .then((response) => {
        //       console.log("위도 경도로 날씨 예보 (5일 3시간 간격 정보) 받아오기 openweathermap");
        //       console.log(response.data);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // };
        const fetchWeather = async () => {
          setIsLoading(true);
          try {
            const geoInfoResponse = axios.get(`api/geoInfo?lat=${lat}&lng=${lng}`);
            const weatherResponse = axios.get(`/api/weatherInfo?lat=${lat}&lng=${lng}`);
            const forecastResponse = axios.get(`/api/forecastInfo?lat=${lat}&lng=${lng}`);

            const responses = await Promise.all([geoInfoResponse, weatherResponse, forecastResponse]);

            console.log("위도 경도로 도시 및 국가 주소 정보 받아오기 google geolocation");
            console.log(responses[0].data);
            setLocInfo({
              city: responses[0].data.results[0]?.formatted_address,
              country: responses[0].data.results[responses[0].data.results.length - 1]?.formatted_address,
            });

            console.log("위도 경도로 날씨 정보 받아오기 openweathermap");
            console.log(responses[1].data);
            setWeatherInfo({
              temperature: responses[1].data.main.temp,
              weather: responses[1].data.weather[0].main,
            });

            console.log("위도 경도로 날씨 예보 (5일 3시간 간격 정보) 받아오기 openweathermap");
            console.log(responses[2].data);
            setForecastInfo(responses[2].data.list);
            console.log(forecastInfo);

            setIsLoading(false); // 모든 요청이 완료되면 isLoading을 false로 설정
          } catch (error) {
            console.log(error);
          }
        };

        fetchWeather();
      }
    }
  }, [geoLocation]);

  return (
    <div className="mx-auto my-0">
      {/* weatherInfo.temperature */}
      {!isLoading ? (
        <div className="px-6 py-3">
          {/* <Header setGeoLocation={setGeoLocation} setIsMyLoc={setIsMyLoc} isMyLoc={isMyLoc} city={city} setCity={setCity} setIsCityExist={setIsCityExist}  /> */}
          <Header info={{ setGeoLocation, setIsMyLoc, isMyLoc, city, setCity, setIsCityExist, setIsLoading }} />
          <Card
            info={{ geoLocation, locInfo, weatherInfo, isMyLoc, city, isCityExist, forecastInfo }}
            className="flex items-center justify-center"
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
