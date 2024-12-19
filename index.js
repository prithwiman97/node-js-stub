const cors = require("cors");
const bodyParser = require("body-parser");
const querystring = require("querystring");
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
  const queryString = querystring.stringify(formData);
  console.log(queryString);
  res.redirect(`https://php-stub.free.nf?${queryString}`);
});
app.get("/", (req, res) => {
  res.send("Hello from Vercel Node.js app");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
