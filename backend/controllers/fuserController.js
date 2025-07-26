const fuserModel = require("../models/fuser");
const user = require("../models/user");
const sendVerificationEmail = require("../utils/emails/sendVerificationEmail");

const getDetails = async (req, res)=>{
    const {department, batch} = req.query;
   
    const fusersDoc =await fuserModel.find({department:department, batch:batch}).select("-password")
    console.log(fusersDoc)
    if(fusersDoc){
        return res.status(200).json({
            message:"Fetched successfully",
            users:fusersDoc
        })
    }
    else{
        return res.status(404).json({
            message:"No users found",
            users:[]
        })
    }
}

const generateVerificationToken = async (req, res) => {
  const userDoc = await user.findOne({ email: req.body.email });
  if (userDoc) {
    return res.status(404).json({
      message: "Email already registered",
    });
  } else {
    const fuser = await fuserModel.findById(req.body._id);
    const token = fuser.generateVerificationToken();
    fuser.verificationToken = token;
    fuser.tokenExpiry = 1000*60*60;
    await fuser.save();
    console.log(fuser)
    const uri = `${process.env.FRONTEND_URI}/user/verify/${token}`;
    const options = { user: fuser, token: token, email: fuser.email, url: uri };
    await sendVerificationEmail(options);
    res.status(200).json({ message: "Verification email sent." });
  }
};

const verifyUserToken =async(req, res)=>{
  const {token} = req.params;
  const fuser = await fuserModel.findOne({verificationToken:token});
  console.log(fuser)
  if(fuser){
    fuser.issigned = true;
    // fuser.verificationToken = undefined;
    await fuser.save();
    res.status(200).json({message:"User verified successfully", user:fuser});
  }
  else{
    res.status(404).json({message:"Invalid token"});
  }
}



module.exports = {getDetails, generateVerificationToken, verifyUserToken}