const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("MongoDB Connected");

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

// Insert User API
app.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// View All Users API
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});