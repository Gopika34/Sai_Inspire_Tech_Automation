import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Business Automation API is running",
    });
});

export default app;