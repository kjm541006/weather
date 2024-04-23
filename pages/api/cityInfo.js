import axios from "axios";

export default async function handler(req, res) {
  const { inputCity } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
}
