import axios from "axios";

export default async function handler(req, res) {
  const { locationKey } = req.query;

  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&language=ko-KR&metric=true`
    );
    res.status(200).json(response.data);
  } catch {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
}
