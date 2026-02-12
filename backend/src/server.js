import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductRoutes from "./routes/publicProductRoutes.js";
import publicCategoryRoutes from "./routes/publicCategoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

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

app.get("/", (req, res) => {
    res.send("MISA backend running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
