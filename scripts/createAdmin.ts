import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config();

// 🔹 Edit admin details here
const adminData = 
{
  name: "Pranjal Pandya",
  email: "Foodfolio.pranjalpandya@gmail.com",
  password: "food@123",
  role: "admin",
  about: "FoodFolio is a platform dedicated to sharing knowledge, research, and real-world experiences in food safety, risk management, and quality assurance. It reflects a journey of continuous learning and practical exposure in the food industry.",
  bio: "Building safer food systems by sharing research-driven insights on food safety, risk management, and quality assurance.",
  location: "Parma, Italy",
  socials: [
    {
      "platform": "email",
      "url": "mailto:Foodfolio.pranjalpandya@gmail.com"
    },
  ],
  "profileImage": "https://res.cloudinary.com/dkrxujdgc/image/upload/v1777145883/portfolio/profile/photo_mh8iq9.png",
  "isVerified": true
}

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
  ...adminData,
  password: hashedPassword,
  email: adminData.email.toLowerCase()
});

    console.log("✅ Admin created successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();