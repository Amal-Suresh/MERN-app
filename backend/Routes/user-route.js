const express = require("express")
const userRoute =express()
const userController = require("../Controller/userController")


const User =require("../Model/usersModel")



userRoute.post("/register",userController.loadRegister)
userRoute.post('/login',userController.verfyLogin)
userRoute.post('/check-if-user',userController.checkUser)
userRoute.get('/getprofile')
userRoute.post('update-user')





module.exports =userRoute
