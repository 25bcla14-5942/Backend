const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const dbURI = "mongodb+srv://25bcla14_db_user:kju@5942@cluster0.kvmscbn.mongodb.net/?appName=Cluster0";

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", MessageSchema);

// API route to receive form data
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    await newMessage.save();

    res.status(200).json({ success: true, message: "Saved to MongoDB" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

// Test route (to check backend is running)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
