import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    experience: Number,
    recommendationPercentage: Number,
    patientsTreated: Number,
    degrees: [String],
    languagesSpoken: [String],
    about: String,
    education: [String],
    registrationNumber: String,
    location: String,
    clinic: String,
    onlineConsultationFees: Number,
    physicalConsultationFees: Number,
    treatmentsOffered: [String],
    achievements: [String],
    membership: [String],
    photo: String, // optional
    mode:{
        type:String,
        enum:["Hospital Visit","Online Consult","Both"],
        default:"Online Consult"
    },
    facility:{
        type:String,
        enum:["Apollo Hospital","Other Clinics"],
        default:"Apollo Hospital"
    }
}, { timestamps: true });

export const Doctor = mongoose.model("Doctor", doctorSchema);


