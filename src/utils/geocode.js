import fetch from "node-fetch";
const geoCode = async (place) => {
  const geoUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoicm9tYW41Nzc3IiwiYSI6ImNrc2VwMm9hNDEyZmIycG1jemJ1NXBlMzYifQ.Sx5BlQeQz-HaaDFUta9S2w&limit=1`;
  try {
    const res = await fetch(geoUrl);
    if (!res.ok) {
      throw new Error("check url");
    }
    const data = await res.json();
    if (data.features.length === 0) {
      throw new Error("such place not found");
    }
    return await `${data.features[0].center[1]},${data.features[0].center[0]} `;
  } catch (e) {
    console.log(e.message);
  }
};
export default geoCode;
