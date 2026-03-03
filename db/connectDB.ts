import mongoose from "mongoose";

type connectionObject  = {
isConnected?:number;
}

const connection : connectionObject = {}

export const connectDB = async () =>{
    console.log(process.env.MONGO_URI );
if(connection.isConnected){
    console.log("DB is already Connected");
    return;
}

try {
    
    const db  = await mongoose.connect(process.env.MONGO_URI || "")
    connection.isConnected = db.connections[0].readyState
    console.log('Database connected successfully');
} catch (error) {
    console.log("failed to connect DB : ",error);
    process.exit(1)
}
}