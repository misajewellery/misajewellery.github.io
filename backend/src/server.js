import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductRoutes from "./routes/publicProductRoutes.js";
import publicCategoryRoutes from "./routes/publicCategoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

dotenv.config();

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// Expect required variables to be provided by the runtime environment
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set in the environment");
    process.exit(1);
}

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", publicProductRoutes); // Public endpoints
app.use("/api/categories", publicCategoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/upload", uploadRoutes);

// Make uploads folder static
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
        res.type("html").send(`<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MISA Jewellery Backend</title>
        <link rel="icon" type="image/svg+xml" href="/misa-favicon.svg" />
        <style>
            body { margin: 0; font-family: Arial, sans-serif; background: #020408; color: #EAEAEA; }
            .wrap { min-height: 100vh; display: grid; place-items: center; padding: 20px; }
            .card { border: 1px solid #1c2a45; background: #0a1525; border-radius: 12px; padding: 24px; max-width: 520px; width: 100%; }
            h1 { margin: 0 0 8px; color: #D4AF37; font-size: 24px; }
            p { margin: 0; color: #8da9c4; }
        </style>
    </head>
    <body>
        <div class="wrap">
            <div class="card">
                <h1>MISA Jewellery Backend</h1>
                <p>API server is running successfully.</p>
            </div>
        </div>
    </body>
</html>`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
