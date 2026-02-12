import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../src/config/db.js";
import Admin from "../src/models/Admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env"), override: true });

const run = async () => {
    const email = process.env.ADMIN_EMAIL;
    const username = process.env.ADMIN_USERNAME || (email ? email.split("@")[0] : undefined);
    const password = process.env.ADMIN_PASSWORD;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!email || !username || (!password && !passwordHash)) {
        throw new Error("Missing ADMIN_EMAIL/ADMIN_USERNAME and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH in .env");
    }

    await connectDB();

    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
        existingAdmin.email = email;
        existingAdmin.username = username;
        if (passwordHash) {
            existingAdmin.password = passwordHash;
        } else {
            existingAdmin.password = password;
        }
        await existingAdmin.save();
        console.log("Admin updated");
        return;
    }

    await Admin.create({
        email,
        username,
        password: passwordHash || password
    });

    console.log("Admin created");
};

run()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
