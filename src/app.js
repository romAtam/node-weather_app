import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
import geoCode from "./utils/geocode.js";
import getWeather from "./utils/getWeather.js";
import hbs from "hbs";
console.log();
import user from "./data.js";
const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
//static
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(path.join(__dirname, "../public")));
//dynamic
app.get("/", (req, res) => {
  res.render("index", user);
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "petro",
    title: "about",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "vasil",
    title: "help",
  });
});
app.get("/weather", (req, res) => {
  const place = req.query.search;
  if (!place) {
    return res.render("error", {
      title: "405",
      name: "roman",
      message: "the address has to be provided",
    });
  }
  console.log(place);
  geoCode(place)
    .then((data) => getWeather(data))
    .then((d) => res.send(d));
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "405",
    name: "roman",
    message: "help page not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "roman",
    message: "page not found",
  });
});

const server = app.listen(3000, () => console.log("listening on port 3000"));
