const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');
const app = express();

const homeController = require("./controllers/home");
const transactionController = require("./controllers/process-request");
const refundController = require("./controllers/process-refund");

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/process-request", transactionController.processRequestPOST);
app.post("/process-refund", refundController.processRefundPOST);
app.post("/", homeController.showFormPOST);
app.get("/process-request", transactionController.processRequestGET);
app.get("/", homeController.showFormGET);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
