import { useEffect, useState } from "react";

export default function Main() {
  const [location, setLocation] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("위치 정보를 사용할 수 없습니다.");
    }
  }, []);

  return (
    <div>
      <h1>날씨 정보</h1>
      <p>오늘의 날씨는 맑음입니다.</p>
      <h1>현재 위치</h1>
      <p>위도: {location.latitude}</p>
      <p>경도: {location.longitude}</p>
    </div>
  );
}
