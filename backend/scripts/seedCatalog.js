import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../src/config/db.js";
import Category from "../src/models/Category.js";
import Product from "../src/models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env"), override: true });

const categoriesSeed = [
    { slug: "gold-rings", name: "Rings", code: "RNG", imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1600&auto=format&fit=crop" },
    { slug: "diamond-necklaces", name: "Necklaces", code: "NCK", imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1600&auto=format&fit=crop" },
    { slug: "bridal-sets", name: "Bridal Collection", code: "BRC", imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1600&auto=format&fit=crop" },
    { slug: "daily-wear", name: "Daily Wear", code: "DWR", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop" },
    { slug: "gifts-coins", name: "Gifts & Coins", code: "GFT", imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1600&auto=format&fit=crop" },
    { slug: "bangles", name: "Bangles", code: "BNG", imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop" },
    { slug: "earrings", name: "Earrings", code: "EAR", imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600&auto=format&fit=crop" }
];

const legacyProducts = [
    {
        name: "Royal Gold Necklace",
        categorySlug: "diamond-necklaces",
        materialType: "Gold",
        price: 95000,
        imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Diamond Solitaire Ring",
        categorySlug: "gold-rings",
        materialType: "Silver With Diamond",
        price: 125000,
        imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Bridal Choker Set",
        categorySlug: "bridal-sets",
        materialType: "Gold With Diamond",
        price: 285000,
        imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Elegant Gold Chain",
        categorySlug: "daily-wear",
        materialType: "Gold",
        price: 52000,
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Gold Coin - Lakshmi",
        categorySlug: "gifts-coins",
        materialType: "Gold",
        price: 62000,
        imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Temple Jewellery Set",
        categorySlug: "bridal-sets",
        materialType: "Gold",
        price: 405000,
        imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Silver Charm Bracelet",
        categorySlug: "bangles",
        materialType: "Silver",
        price: 15000,
        imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop"
    },
    {
        name: "Diamond Studs",
        categorySlug: "earrings",
        materialType: "Gold With Diamond",
        price: 45000,
        imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600&auto=format&fit=crop"
    }
];

const makeSku = (code, index) => `MISA-${code}-${String(index).padStart(3, "0")}`;

const run = async () => {
    await connectDB();

    const categoryBySlug = new Map();

    for (const categorySeed of categoriesSeed) {
        let category = await Category.findOne({ slug: categorySeed.slug });

        if (!category) {
            category = await Category.create({
                name: categorySeed.name,
                slug: categorySeed.slug,
                code: categorySeed.code,
                imageUrl: categorySeed.imageUrl
            });
        }

        categoryBySlug.set(categorySeed.slug, category);
    }

    for (let index = 0; index < legacyProducts.length; index += 1) {
        const item = legacyProducts[index];
        const category = categoryBySlug.get(item.categorySlug);

        if (!category) {
            continue;
        }

        const existing = await Product.findOne({ name: item.name, categoryId: category._id });
        if (existing) {
            continue;
        }

        const sku = makeSku(category.code, index + 1);

        await Product.create({
            name: item.name,
            sku,
            categoryId: category._id,
            materialType: item.materialType,
            description: `${item.name} from ${category.name}`,
            productNumber: index + 1,
            price: item.price,
            imageUrl: item.imageUrl,
            isActive: true
        });
    }

    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    console.log(`Catalog seeded. Categories: ${totalCategories}, Products: ${totalProducts}`);
};

run()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
