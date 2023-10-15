require("dotenv").config();
let express = require("express");
let app = express();
let path = require("path");
let data = require("./users");
const { default: axios } = require("axios");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static("public"));
app.listen(process.env.PORT, () => {
  console.log("world listening");
});
app.get("/", (req, res) => {
  res.status(200).render("home", { data });
});
app.get("/:id", async (req, res) => {
  try {
    let url = process.env.API;
    url += req.params.id;
    data = await axios.get(url);
    res.status(200).render("user", { ...data.data });
  } catch (err) {
    res.status(403).json({ error: "API limit reached" });
  }
});
app.get("*", (req, res) => {
  res.status(404).send("404 Error");
});
