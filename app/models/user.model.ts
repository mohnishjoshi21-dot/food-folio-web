  // import mongoose, { Document, Schema } from "mongoose";

  // export interface IUser extends Document {
  //   name: string;
  //   email: string;
  //   password: string;
  //   role: "admin";
  //   forgotPasswordToken?: string;
  //   forgotPasswordExpiry?: Date;
  // }

  // const userSchema: Schema<IUser> = new mongoose.Schema(
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //       trim: true,
  //     },

  //     email: {
  //       type: String,
  //       required: true,
  //       unique: true,
  //       lowercase: true,
  //       trim: true,
  //     },

  //     password: {
  //       type: String,
  //       required: true,
  //     },

  //     role: {
  //       type: String,
  //       enum: ["admin"],
  //       default: "admin",
  //     },

  //     forgotPasswordToken: {
  //       type: String,
  //     },

  //     forgotPasswordExpiry: {
  //       type: Date,
  //     },
  //   },
  //   { timestamps: true }
  // );

  // const UserModel =
  //   mongoose.models.User ||
  //   mongoose.model<IUser>("User", userSchema);

  // export default UserModel;



  import mongoose, { Document, Schema } from "mongoose";

  interface ISocial {
    platform: string;
    url: string;
  }

  export interface IUser extends Document {
    // 🔐 Auth
    name: string;
    email: string;
    password: string;
    role: "admin";
    isVerified: boolean;

    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;

    // 👤 Portfolio Data
    bio: string;
    about:string;
    location: string;
    profileImage: string;
    logo: string;


    // 📱 Socials (Flexible)
    socials: ISocial[];
    createdAt: Date;
    updatedAt: Date;
  }

  const socialSchema = new Schema<ISocial>(
    {
      platform: {
        type: String,
        required: true,
        enum: [
          "email",
          "phone",
          "linkedin",
          "instagram",
          "whatsapp",
          "youtube",
          "twitter",
        ],
      },
      url: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  );

  const userSchema: Schema<IUser> = new mongoose.Schema(
    {
      // 🔐 AUTH
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: ["admin"],
        default: "admin",
      },

      isVerified: {
        type: Boolean,
        default: true,
      },

      forgotPasswordToken: String,
      forgotPasswordExpiry: Date,

      // 👤 PORTFOLIO
      bio: String,
      about:String,
      location: String,
      profileImage: String,
      logo: String,

      // 📱 SOCIALS
      socials: [socialSchema],
    },
    { timestamps: true }
  );

  const UserModel =
    mongoose.models.User ||
    mongoose.model<IUser>("User", userSchema);

  export default UserModel;