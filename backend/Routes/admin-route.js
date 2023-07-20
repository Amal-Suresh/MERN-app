const express = require("express")
const adminRoute =express()
const adminController =require("../Controller/adminController")

adminRoute.post('/login',adminController.verfyLogin)
adminRoute.post('/check-if-admin',adminController.checkAdmin)
adminRoute.get('/get-all-user',adminController.getUserdata)
adminRoute.get('/block-unblock-user',adminController.changeStatus)








module.exports =adminRoute