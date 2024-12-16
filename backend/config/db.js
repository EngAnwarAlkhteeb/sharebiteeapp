import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ShareBite:internationalclass@cluster0.xcmvq.mongodb.net/Share-Bite').then(()=>console.log("DB Connected"));
}
