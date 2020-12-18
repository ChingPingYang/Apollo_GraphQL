const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mba6s.azure.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

exports.connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to DB...");
  }
};
