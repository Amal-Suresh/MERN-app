const Admin = require('../Model/adminModel')
const User = require('../Model/usersModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const   verfyLogin = async(req,res)=>{
    try {
        console.log("reached post login");
        console.log(req.body);
        const {admin}=req.body
        console.log(admin,"usereeererr");

        const adminDetail = await Admin.findOne({email:req.body.admin.email})
        if(!adminDetail){
            return res.status(200).send({message:"admin does not exsist",success:false})
        }
        
        
       const userMatch= bcrypt.compareSync(admin.password, adminDetail.password);
       if(!userMatch){
            return res.status(200).send({message:"Password is incorrect",success:false})

       }else{

        const token=jwt.sign({id:adminDetail._id,name:adminDetail.name},"XYZABC",{expiresIn:"1d"})
        const admin = {
            id:adminDetail._id,
            name:adminDetail.name
           }
        res.status(200).send({message:"login successfull", success:true,data:{token},admindata:admin})

       }



    } catch (error) {
        
        console.log(error.message);
        res.status(500).send({message:"Error logging in",success:false,error})
    }
}

const checkAdmin= async(req,res)=>{
    try {
      
        jwt.verify(req.body.token,"XYZABC",(err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message:"Auth failed",
                    success:false
                })
            }else{
              
                const admin = {
                id:decoded.id,
                name:decoded.name
               }
               res.status(200).send({message:"admin found",success:true,admindata:admin})
            }
        })

    } catch (error) {
        return res.status(401).send({
            message:"Auth failed",
            success:false,error
        })
        
    }
}

const getUserdata = async (req,res)=>{
   try {
    console.log("reached get all user data");
   const  userdata = await User.find().lean()
   if(userdata){
         res.status(200).send({message:"users found",success:true,user:userdata})
   }else{
        res.status(200).send({message:"no users found",success:true})
   }
   } catch (error) {
    res.status(401).send({message:"something went wrong",success:false})
    
   }

}
const changeStatus=async(req,res)=>{
    try {
        console.log(req.query,"iddd");
    const userdetail = await User.findOne({_id:req.query.id})

    userdetail.status = !userdetail.status

    const update = await userdetail.save()
    const users = await User.find().lean()
        if(update){
            res.status(200).send({message:"status changed sucessfully",success:true,userdata:users})
        }else{
            res.status(200).send({message:"oop's status not changed",success:false})

        }
    
    } catch (error) {
        res.status(401).send({message:"something went wrong",success:false})

        
    }
 
}



module.exports={
    verfyLogin,
    checkAdmin,
    getUserdata,
    changeStatus

   

}