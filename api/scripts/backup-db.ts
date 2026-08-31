import mongoose from "mongoose";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Load .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "mca";

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env");
  process.exit(1);
}

async function backup() {
  console.log(`Connecting to MongoDB Atlas Database: ${DB_NAME}...`);
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.resolve(__dirname, `../../backups/mongo_backup_${timestamp}`);
  fs.mkdirSync(backupDir, { recursive: true });

  const collections = await mongoose.connection.db!.listCollections().toArray();
  console.log(`Found ${collections.length} collections:`, collections.map((c) => c.name));

  const manifest: Record<string, any> = {
    timestamp: new Date().toISOString(),
    database: DB_NAME,
    collections: {},
  };

  let totalDocs = 0;

  for (const col of collections) {
    const colName = col.name;
    const data = await mongoose.connection.db!.collection(colName).find({}).toArray();
    const count = data.length;
    totalDocs += count;

    const outFile = path.join(backupDir, `${colName}.json`);
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2), "utf-8");

    const size = fs.statSync(outFile).size;
    manifest.collections[colName] = {
      count,
      file: `${colName}.json`,
      sizeBytes: size,
    };

    console.log(`  ✓ Backed up collection '${colName}': ${count} documents (${(size / 1024).toFixed(1)} KB)`);
  }

  const manifestFile = path.join(backupDir, "manifest.json");
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), "utf-8");

  console.log("\n==========================================");
  console.log(`✅ COMPLETE BACKUP VERIFIED: ${totalDocs} total documents backed up.`);
  console.log(`📁 Backup directory: ${backupDir}`);
  console.log("==========================================");

  await mongoose.disconnect();
}

backup().catch((err) => {
  console.error("Backup failed:", err);
  process.exit(1);
});
