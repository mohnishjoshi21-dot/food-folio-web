import UserModel from "@/app/models/user.model";
import { connectDB } from "@/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import { changePasswordSchema } from "@/lib/validations/changePassword.schema";
import bcrypt from "bcryptjs";


export async function POST(request:Request) {
    await connectDB()
    try {
        const body = await request.json()
        const validationResult =  changePasswordSchema.safeParse(body)
        if(!validationResult.success){
             return apiResponse(false,validationResult.error.format().newPassword?._errors[0]||"invalid formate of password",400)
        }

        const {oldPassword, newPassword,email} = validationResult.data
      

        const user = await UserModel.findOne({email})

        if(!user){
            return apiResponse(false,"user not available",401)
        }

       const  isPasswordCorrect = await bcrypt.compare(oldPassword,user.password)

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