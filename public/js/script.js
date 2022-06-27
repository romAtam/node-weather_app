const text1 = document.querySelector("p");
const form = document.querySelector("form");
const input = document.querySelector("input");

const handleFetch = async (place) => {
  const datajson = await fetch(`http://localhost:3000/weather?search=${place}`);
  const d = await datajson.json();
  const text = `weather at ${d.place.name}.${d.place.country}.at time :${d.time.time}.temperature is ${d.weather.temp}.${d.weather.descr}`;
  text1.textContent = text;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  console.log(text);
  handleFetch(text);
});
// fetch("http://localhost:3000/weather?search=moscow")
//   .catch((er) => (text.textContent = er.message))
//   .then((d) => d.json())
//   .then((d) => {
//     console.log(d);
//     text1.textContent = `weather at ${d.place.name}.${d.place.country}.at time :${d.time.time}.temperature is ${d.weather.temp}.${d.weather.descr}`;
//   });
