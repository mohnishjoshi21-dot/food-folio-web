import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
  email:string
}

export const generateToken = (payload: JwtPayload) => {
  if (!process.env.SECRET_TOKEN) {
    throw new Error("SECRET_TOKEN is not defined");
  }

  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
};