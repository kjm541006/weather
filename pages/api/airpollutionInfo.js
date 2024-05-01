import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch air pollution data" });
  }
}
