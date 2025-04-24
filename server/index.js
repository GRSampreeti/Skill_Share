const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // 👈 Add this line

const app = express();
dotenv.config();

app.use(cors()); // 👈 Enable CORS for all origins (for dev)
app.use(bodyParser.json());

const route = require("./routes/userRoutes");  // Import route AFTER app is initialized
app.use("/api/users", route);  // Mount route here

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected!!!!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
