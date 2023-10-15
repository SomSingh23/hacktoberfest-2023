require("dotenv").config();
let express = require("express");
let app = express();
let path = require("path");
let data = require("./users");
const { default: axios } = require("axios");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("world listening");
});
app.get("/", (req, res) => {
  res.render("home", { data });
});
app.get("/:id", async (req, res) => {
  let url = process.env.API;
  url += req.params.id;
  data = await axios.get(url);
  res.render("user", { ...data.data });
});
