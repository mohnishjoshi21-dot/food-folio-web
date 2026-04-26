import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { changePasswordSchema } from "@/lib/validations/changePassword.schema";
import bcrypt from "bcryptjs";
import { jwtDecrypt, jwtVerify } from "jose";
import { NextRequest } from "next/server";


export async function POST(request:NextRequest) {
    await connectDB()
        const body = await request.json()

        //  const validationResult =  changePasswordSchema.safeParse(body)

        // if(!validationResult.success){
        //      return apiResponse(false,validationResult.error.format().newPassword?._errors[0]||"invalid formate of password",400)
        // }

        const token = request.cookies.get("token")?.value;

        if(!token){
           return apiResponse(false,"token not fount",401)
        }

        
        try {
            const secret = new TextEncoder().encode(
                process.env.SECRET_TOKEN as string
            );
            
            
            const { payload } = await jwtVerify(token, secret);
            
            const userId = payload.id as string;
       

        // const {oldPassword, newPassword} = validationResult.data
        const {currentPassword, newPassword} = body
      console.log(currentPassword,newPassword,userId);
      

        const user = await UserModel.findById(userId)

        if(!user){
            return apiResponse(false,"user not available",401)
        }

       const  isPasswordCorrect = await bcrypt.compare(currentPassword,user.password)

       if(!isPasswordCorrect){
        return apiResponse(false,"Current Password is Incorrect",401)
       }

       const hashedPassword = await bcrypt.hash(newPassword,10)

       user.password = hashedPassword;

       await user.save()

       return apiResponse(true,"Password changed",200)

    } catch (error) {
        console.log("Error in change password");
        return apiResponse(false,"Failed to change password")
    }
}