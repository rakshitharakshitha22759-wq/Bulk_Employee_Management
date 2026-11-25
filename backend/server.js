import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/employees", employeeRoutes);


// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {

            console.log(`Server running on port ${PORT}`);

        });

    } catch (error) {

        console.log("Server startup failed:", error.message);

        process.exit(1);

    }

};

startServer();