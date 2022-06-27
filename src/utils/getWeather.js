import fetch from "node-fetch";

const getWeather = async (data) => {
  const key = "f0f270030758f8fee1857993c9035644";
  const url = `http://api.weatherstack.com/current?access_key=${key}`;
  const baseurl = `${url}&query=${data}`;
  console.log(baseurl);
  const res = await fetch(baseurl);
  const dat = await res.json();
  return {
    place: {
      name: dat.location.name,
      country: dat.location.country,
      region: dat.location.region,
    },
    time: {
      time: dat.location.localtime.slice(-5),
      date: dat.location.localtime.slice(0, 10),
    },
    weather: {
      temp: dat.current.temperature,
      descr: dat.current.weather_descriptions[0],
      wind: {
        diraction: dat.current.wind_dir + dat.current.wind_degree,
        speed: dat.current.wind_speed + " meters/s",
      },
      pressure: dat.current.pressure,
      rain_prob: dat.current.precip,
    },
  };
};

export default getWeather;
