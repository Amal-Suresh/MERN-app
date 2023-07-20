const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const colors = require("colors");
const cors = require('cors');
const path = require('path')




// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-miniProject").then(() => {
  console.log("Mongo Db connected".red.bold);
});

// Initialize Express app
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json())


app.use(express.static(path.join(__dirname,'public')))

app.use(cors({
  origin: "http://localhost:3000/",
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"]
}));

// Load user and admin routes
app.use("/", require("./Routes/user-route"));
app.use("/admin", require("./Routes/admin-route"));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Connected to Server".yellow.bold);
});