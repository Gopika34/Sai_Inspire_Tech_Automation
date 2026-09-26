import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/authRoutes.js";
import {protect} from "./middleware/authMiddleware.js";

const app = express();

app.set('trust proxy',1);

app.use(helmet());
app.use(cors());
app.use(express.json());

const stdLimiter=rateLimit({
    windowMs: 15*60*1000, //15mins
    limit: 100, //req per 15 mins
    message:{
        status: 429,
        error:'Too Many Requests',
        message:"You have exceeded your request limit. Please try again after 15 minutes.",
    },
    standardHeaders: 'draft-7', // Recommended: Sends standard headers back to client
    legacyHeaders: false,
});

const authLimiter= rateLimit({
    windowMs: 60*1000, //1 min
    limit: 5, //req per min
    message:{
        error: "Too many login attempts. Please try again in a minute.",
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

app.get("/", (req, res) => {
    res.json({
        message: "Business Automation API is running",
    });
});

app.use('/api',stdLimiter);

app.use("/api/auth",protect,authLimiter,authRoute);

app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;