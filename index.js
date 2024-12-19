const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  const formData = req.body;
  console.log(formData);
  let queryParams = [];
  for (let key in formData) {
    queryParams.push(key + "=" + formData[key]);
  }
  const querystring = queryParams.join("&");
  console.log(querystring);
  res.redirect(`https://php-stub.free.nf?${encodeURIComponent(querystring)}`);
});
app.get("/", (req, res) => {
  res.send("Hello from Vercel Node.js app");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
