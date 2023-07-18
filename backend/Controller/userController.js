const User = require("../Model/usersModel")
const bcrypt = require("bcrypt")
require('dotenv').config() 
const jwt = require("jsonwebtoken")




const loadRegister = async(req,res)=>{
    try {
    const UserExists = await User.findOne({email:req.body.user.email})

    if(UserExists){
        return res.status(200).send({message:"User already exists",sucess:false})
    }
    const hash = bcrypt.hashSync(req.body.user.password, 10);

    const userdata= new User({
        name:req.body.user.name,
        email:req.body.user.email,
        password:hash
    })
    await userdata.save()

    res.status(200).send({message:"User Created Sucessfully",sucess:true})
        
    } catch (error) {
        res.status(500).send({message:"Error creating User",sucess:false,error})   
    }
}


const verfyLogin = async(req,res)=>{
    try {
        console.log("reached post login");
        console.log(req.body);
        const {user}=req.body
        console.log(user,"usereeererr");

        const userDetail = await User.findOne({email:req.body.user.email})
        if(!userDetail){
            return res.status(200).send({message:"User does not exsist",success:false})
        }
        console.log(user.password);
        
       const userMatch= bcrypt.compareSync(user.password, userDetail.password);
       if(!userMatch){
            return res.status(200).send({message:"Password is incorrect",success:false})

       }else{

        const token=jwt.sign({id:userDetail._id,name:userDetail.name},"XYZABC",{expiresIn:"1d"})
        const user = {
            id:userDetail._id,
            name:userDetail.name
           }
        res.status(200).send({message:"login successfull", success:true,data:{token},userdata:user})

       }



    } catch (error) {
        
        console.log(error.message);
        res.status(500).send({message:"Error logging in",success:false,error})
    }
}

const checkUser= async(req,res)=>{
    try {
        console.log(req.body.token,"got it token's");
        jwt.verify(req.body.token,"XYZABC",(err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message:"Auth failed",
                    success:false
                })
            }else{
                console.log(decoded,"//////////............////////////");
                const user = {
                id:decoded.id,
                name:decoded.name
               }
               res.status(200).send({message:"user found",success:true,userdata:user})
            }
        })

    } catch (error) {
        return res.status(401).send({
            message:"Auth failed",
            success:false,error
        })
        
    }
}

module.exports={
    loadRegister,
    verfyLogin,
    checkUser
}