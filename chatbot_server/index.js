import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postUsers from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
import prescriptionRoutes from "./routes/prescriptions.js";
import appointmentRoutes from "./routes/appointments.js";
import hospitalRoutes from "./routes/hospitals.js";
import specialtyRoutes from "./routes/specialties.js";
import postRoutes from "./routes/ProfileModule.js";
import CRoutes from "./routes/ConsultModule.js";
import ORoutes from "./routes/OrderModule.js";
import userLocationRoute from "./routes/userLocation.js";
//import PayRoutes from './routes/PaymentModule.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// http://localhost:5000/prescriptions
app.use("/prescriptions", prescriptionRoutes);

// http://localhost:5000/userLocation
app.use("/userLocation", userLocationRoute);

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/specialties", specialtyRoutes);
app.use("/users", postUsers);

//http://localhost:5000/userProfilemanagement
app.use("/ProfileModule", postRoutes);
app.use("/Consultation", CRoutes);
app.use("/Orders", ORoutes);
app.use("/ProfileModule", postRoutes);

// mongo db atlas connection
const MONGO_CONNECTION_URL =
  "mongodb://sd02_2021:ccpchatbot2021@sd022021-shard-00-00.jjnpx.mongodb.net:27017,sd022021-shard-00-01.jjnpx.mongodb.net:27017,sd022021-shard-00-02.jjnpx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13th4d-shard-0&authSource=admin&retryWrites=true&w=majority";
//"mongodb+srv://sd02_2021:ccpchatbot2021@sd022021.jjnpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// specified the port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
