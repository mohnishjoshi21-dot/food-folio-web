import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { changePasswordSchema } from "@/lib/validations/changePassword.schema";
import bcrypt from "bcryptjs";
import { jwtDecrypt, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return apiResponse(false, "Token not found", 401);
  }

  try {
    const secret = new TextEncoder().encode(process.env.SECRET_TOKEN!);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.id as string;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: body.name,
        bio: body.bio,
        about: body.about,
        location: body.location,
        socials: body.socials,
        profileImage:body.profileImage,
      },
      { new: true }
    );

    return apiResponse(true, "Profile updated", 200, updatedUser);
  } catch (error) {
    return apiResponse(false, "Failed to update profile");
  }
}




export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const user = await UserModel.findOne({}).select("-password");

    if (!user) {
      return apiResponse(false, "User not found", 404);
    }

    return apiResponse(true, "Profile Details Fetched", 200, user);
  } catch (error) {
    return apiResponse(false, "Failed to Fetch profile");
  }
}