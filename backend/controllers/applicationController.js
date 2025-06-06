const jobApplications = require("../models/jobApplications");
const jobsfeed = require("../models/jobsfeed");
const user = require("../models/user");

const addJobApplication = async (req, res) => {
  try {
    const {_id}= req.params;
    const {
      name,
      email,
      degree,
      department,
      batch,
      place,
      experience,
      skills,
      resume,
      additionalInfo,
    } = req.body;
    if (!name || !email || !degree || !resume) {
      return res.status(400).json({ message: "Required fields missing", success:false });
    }

    const jobDoc = await jobsfeed.findById(_id);
    if(!jobDoc){
        return res.status(400).json({
            success:false,
            message:"Job not found"
        })
    }
    const userDoc = await user.findOne({email:email})
    if(!userDoc){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }
    const newApplication = new jobApplications({
      name,
      email,
      degree,
      department,
      batch,
      place,
      experience,
      skills,
      resume,
      additionalInfo,
    });
    const savedApplication = await newApplication.save();
    userDoc.applications.push(jobDoc._id);
    jobDoc.applicants.push(savedApplication._id);
    await userDoc.save();
    await jobDoc.save();
    res.status(201).json({ message: "Job application saved", success:true });
  } catch (error) {
    console.error("Error saving job application:", error);
    res.status(500).json({ message: "Server error", success:false });
  }
};

const trackMyJobs = async (req, res) => {
  try {
    const jobs = await jobsfeed.find({ owner: req.user.uid }).populate("applicants").lean(); // not populating applicants here

    const updatedJobs = await Promise.all(
      jobs.map(async job => {
        const applicants = job.applicants || [];

        const applicantEmails = applicants.map(applicant => applicant.email);

        const users = await user.find({ email: { $in: applicantEmails } }).select('-password -salt').lean();
        const mergedApplicants = applicants.map(applicant => {
          const userInfo = users.find(u => u.email === applicant.email);
          return {
            ...applicant,     
            ...(userInfo || {})
          };
        });

        return {
          ...job,
          applicants: mergedApplicants
        };
      })
    );

    return res.status(200).json({
      message: "Success",
      success: true,
      jobs: updatedJobs
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Error",
      jobs: [],
      success: false
    });
  }
};




const trackAllJobApplication = async (req, res) => {
    try {
      const userId = req.user.uid;
      const userEmail = req.user.email;

      const jobs = await jobsfeed.find({
        applicants: {
          $exists: true,
          $ne: []
        }
      }).populate({
        path: 'applicants',
        match: { email: userEmail }, 
      });

      const userJobs = jobs.filter(job => job.applicants.length > 0);
  
      return res.status(200).json({
        message: { appliedJobs: userJobs },
        success: true,
      });
    } catch (err) {
      console.error("Error fetching job applications:", err);
      return res.status(400).json({
        message: [],
        success: false,
      });
    }
  };
  

module.exports = { addJobApplication, trackAllJobApplication, trackMyJobs };
