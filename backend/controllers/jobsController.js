const Jobs = require("../models/jobsfeed");
const user = require("../models/user");

const registerJob = async(req, res)=>{
    const {
    title,
    description,
    company,
    industry,
    workType,
    workMode,
    salary,
    experience,
    experienceLevel,
    location,
    proofUrl,
    imageUrl,
    _id
    }= req.body;
    console.log(req.body)
    try{
        const UserDoC= await user.findById(_id);
        if(!UserDoC){
            return res.status(404).json({
                message:"User not found",
                status:false
            })
        }
        const JobDoc = new Jobs({
            title,
            description,
            company,
            industry,
            workType,
            workMode,   
            salary,
            experience,
            experienceLevel,
            location,
            proofUrl,
            imageUrl,
            applicants:[],
            owner:UserDoC._id,
        })
        await JobDoc.save()

        return res.status(200).json({
            message:"Success",
            status:true
        })
    }catch(err){
        return res.status(400).json({
            message:`Error:${err}`,
            status:true
        })
    }

}


const searchJobById = async(req, res)=>{
    const {_id} = req.params;
    try{
        let job = await Jobs.findById(_id);
        job= await job.populate("owner", "name email profileImage batch department degree place verified");
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                status:false,
                job:{}
            })
        }
        return res.status(200).json({
            message:"Success",
            status:true,
            job:job
        })  
    }catch(err){
        return res.status(400).json({
            message:`Error:${err}`,
            status:false,
            job:{}
        })
    }
}

const searchJobByUser= async(req, res)=>{
    const {_id} = req.params;
    if(_id==="all"){
        let job = await Jobs.find().populate("owner", "name email profileImage batch department degree place verified");
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                status:false,
                jobs:{}
            })
        }
        //job= await job.populate("owner", "name email profileImage batch department degree place verified");
        return res.status(200).json({
            message:"Success",
            status:true,
            jobs:job
        })
    }
    try{
        const userDoc= await user.findById(_id);
        let job = await Jobs.find().populate("owner", "name email profileImage batch department degree place verified");
        job= JSON.parse(JSON.stringify(job));
        job= job.filter((job)=> job.owner._id.toString() === _id);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                status:false,
                jobs:{}
            })
        }
        //job= await job.populate("owner", "name email profileImage batch department degree place verified");
        return res.status(200).json({
            message:"Success",
            status:true,
            jobs:job
        })
    }catch(err){
        return res.status(400).json({
            message:`Error:${err}`,
            status:false,
            jobs:{}
        })
    }
}


// const searchJobByField = async (req, res) => {
//     try {
//       const { name, job, places, mode, experienceLevels } = req.query;
  
//       const placeArr = places ? places.split(",") : [];
//       const modeArr = mode ? mode.split(",") : [];
//       const levelArr = experienceLevels ? experienceLevels.split(",") : [];
  
//       const query = {};
  
//       if (name) {
//         query.name = { $regex: name, $options: "i" };
//       }
  
//       if (job) {
//         query.title = { $regex: job, $options: "i" };
//       }
  
//       if (placeArr.length > 0) {
//         query.location = { $in: placeArr };
//       }
  
//       if (modeArr.length > 0) {
//         query.mode = { $in: modeArr };
//       }
  
//       if (levelArr.length > 0) {
//         query.experienceLevel = { $in: levelArr };
//       }
  
//       const jobs = await Job.find(query);
//       res.status(200).json({ jobs });
//     } catch (error) {
//       console.error("Search error:", error);
//       res.status(500).json({ message: "Server error while searching for jobs." });
//     }
//   };


const searchJobByField = async (req, res) => {
    try {
      const { name, job, places, mode, experienceLevels,type } = req.query;
      const placeArr = places ? places.split(":") : [];
      const modeArr = mode ? mode.split(",") : [];
      const levelArr = experienceLevels ? experienceLevels.split(",") : [];
      const typeArr = type ? type.split(","):[];
      const query = {};
      if (job) {
        query.title = { $regex: job, $options: "i" }; 
      }
      if (name) {
        query["company"] = { $regex: name, $options: "i" };
      }

      if (placeArr.length > 0) {
        query.location = { $in: placeArr };
      }
      if (modeArr.length > 0) {
        query.workMode = { $in: modeArr };
      }
      if (levelArr.length > 0) {
        query.experienceLevel = { $in: levelArr };
      }
      if(typeArr.length>0){
        query.workType= {$in: typeArr}
      }

      const jobs = await Jobs.find(query).populate("owner", "name email profileImage batch department degree place verified"); 
      res.status(200).json({ jobs });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Server error while searching for jobs." });
    }
  };

module.exports={registerJob, searchJobById, searchJobByUser, searchJobByField}