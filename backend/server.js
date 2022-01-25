const app = require('./app')
const mongoose = require("mongoose")

const cloudinary = require("cloudinary")

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
})
//connect database

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to MongoDB"))


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)
    server.close(() => {
        process.exit(1);
    });
})
