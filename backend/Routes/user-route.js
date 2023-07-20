const express = require("express")
const userRoute =express()
const userController = require("../Controller/userController")
const User =require("../Model/usersModel")
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname,"../public/profileimage"), function(error, success) {
        if (error) {
          console.log(error);
        }
      });
    },
    filename: function(req, file, cb) {
      const name = Date.now()+"-"+file.originalname;
      cb(null, name, function(error, success) {
        if (error) {
          console.log(error);
        }
      });
    }
  });
  const upload = multer({ storage: storage });







userRoute.post("/register",userController.loadRegister)
userRoute.post('/login',userController.verfyLogin)

userRoute.post('/check-if-user',userController.checkUser)

userRoute.get('/fetch-user',userController.userProfile)

userRoute.post('/edit-user',upload.single('image'),userController.updateUser)





module.exports =userRoute
