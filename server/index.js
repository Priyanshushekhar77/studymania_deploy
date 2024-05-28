// Importing necessary modules and packages
const express = require("express");
const app = express();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// Loading environment variables from .env file
dotenv.config();

//importing routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
//letter payment system will be done
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Setting up port number
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(cookieParser());

//use kiye hai
// Configure CORS to allow requests from your frontend
// const corsOptions = {
//     // origin: 'https://studymania-deploy.vercel.app',
//     origin:"*",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   };
  
//   app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
 
  
// phle se tha
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);

//database connect
database.connect();
// Connecting to cloudinary
cloudinaryConnect();

//setting up routes paths
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/reach",contactUsRoute)
app.use("/api/v1/course",courseRoutes)

//later payment system will be handled
app.use("/api/v1/payment",paymentRoutes)

//testing the server
app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"your server is running",
    });
});

//listening to the server
app.listen(PORT, () => {
    console.log(`APP is listening at ${PORT}`);
})