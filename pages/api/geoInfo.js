import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=country|locality&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
}
