import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Doctor } from "../models/doctor.model.js";


export const createDoctor = catchAsyncErrors(async (req, res, next) => {
    const {
      name,
      specialization,
      experience,
      recommendation,
      patientCount,
      education,
      languages,
      registrationNumber,
      onlineFees,
      offlineFees,
      location,
      bio,
      mode,
      facility,
      photo
    } = req.body;
  
    // Basic Validation
    if (!name || !specialization || !experience) {
      return next(new ErrorHandler("Please provide name, specialization, and experience", 400));
    }
  
    let doctorData = {
      name,
      specialization,
      experience,
      recommendationPercentage: recommendation,
      patientsTreated: patientCount,
      education,
      registrationNumber,
      location,
      about: bio,
      degrees: education,
      languagesSpoken: languages?.split(',').map(lang => lang.trim()),
      onlineConsultationFees: onlineFees,
      physicalConsultationFees: offlineFees,
      mode,
      facility,
      photo
    };
    console.log("Doctor Data in backend is:",doctorData)
   
    
  
    const doctor = await Doctor.create(doctorData);
  
    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor
    });
  });
  


  export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    let { page = 1, limit = 10, modeOfConsult, experienceRange, feesRange, languageSpoken, facility } = req.query;
  
    page = parseInt(page);
    limit = parseInt(limit);
  
    const filter = {};
  
    // Mode of consult filter
    if (modeOfConsult) {
      const modes = modeOfConsult.split(",");
      filter.mode = { $in: modes };
    }
  
    // Experience range filter
    if (experienceRange) {
      const experienceFilters = experienceRange.split(",").map(range => {
        const [min, max] = range.split("-").map(Number);
        return { experience: { $gte: min, $lte: max } };
      });
      filter.$or = [...(filter.$or || []), ...experienceFilters];
    }
  
    // Fees filter (physicalConsultationFees)
    if (feesRange) {
      const feeFilters = feesRange.split(",").map(range => {
        if (range === "1000+") return { physicalConsultationFees: { $gte: 1000 } };
        const [min, max] = range.split("-").map(Number);
        return { physicalConsultationFees: { $gte: min, $lte: max } };
      });
      filter.$or = [...(filter.$or || []), ...feeFilters];
    }
  
    // Languages spoken
    if (languageSpoken) {
      const langs = languageSpoken.split(",");
      filter.languagesSpoken = { $in: langs };
    }
  
    // Facility filter
    if (facility) {
      const facilities = facility.split(",");
      filter.facility = { $in: facilities };
    }
  
    // Run aggregation with filters
    const result = await Doctor.aggregate([
      { $match: filter },
      {
        $facet: {
          totalDoctors: [{ $count: "count" }],
          doctors: [
            { $skip: (page - 1) * limit },
            { $limit: limit }
          ]
        }
      }
    ]);
  
    const data = result[0];
    const totalDoctors = data.totalDoctors[0]?.count || 0;
    const doctors = data.doctors || [];
    const totalPages = Math.ceil(totalDoctors / limit);
  
    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
      totalDoctors,
      totalPages
    });
  });
  