import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { generateToken } from "@/lib/jwt/generateToken";
import { loginSchema } from "@/lib/validations/login.schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request:NextRequest) {

    await connectDB()
    try {
        const body = await request.json()
        const validationResult = loginSchema.safeParse(body)
        if(!validationResult.success){
            return apiResponse(false,"invalid formate of email",400,{errors: validationResult.error.format().email?._errors || []})
        }

        const {email,password} = validationResult.data

       const user = await UserModel.findOne({ 
  email: email.toLowerCase() 
}).select("+password");

if (!user) {
  return apiResponse(false, "This email does not exist", 400);
}

const isPasswordCorrect = await bcrypt.compare(password, user.password);

if (!isPasswordCorrect) {
  return apiResponse(false, "Incorrect Password", 401);
}
        
        const token  = generateToken({id:user._id,email:user.email,role:user.role})

        const response =  NextResponse.json({
            success:true,
            message:"Login  successful"
        })

        response.cookies.set("token",token)

        return response

    } catch (error) {
        console.log(error);
        
        return apiResponse(false,"failed to Login",400)
    }

}