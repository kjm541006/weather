import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${lat},${lng}&language=ko-KR&metric=true`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
}
