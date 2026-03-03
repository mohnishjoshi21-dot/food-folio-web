import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config();

// 🔹 Edit admin details here
const adminData = {
  name: "Admin Name",
  email: "admin@gmail.com",
  password: "Admin@123",
  role: "admin",
};

async function createAdmin() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingUser = await UserModel.findOne({
      email: adminData.email.toLowerCase(),
    });

    if (existingUser) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create user
    await UserModel.create({
      name: adminData.name,
      email: adminData.email.toLowerCase(),
      password: hashedPassword,
      role: adminData.role,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();