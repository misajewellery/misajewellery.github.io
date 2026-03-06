import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    try {
        if (process.env.MONGO_URI?.startsWith("mongodb+srv://")) {
            dns.setDefaultResultOrder("ipv4first");
            try {
                dns.setServers(["8.8.8.8", "1.1.1.1"]);
            } catch (dnsError) {
                console.warn("DNS setup warning ⚠️", dnsError.message);
            }
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.error("MongoDB Error ❌", error.message);
        if (error.message.includes("querySrv ECONNREFUSED")) {
            console.error("Try switching network DNS to 8.8.8.8 / 1.1.1.1 or use a non-SRV MongoDB URI.");
        }
        process.exit(1);
    }
};

export default connectDB;
