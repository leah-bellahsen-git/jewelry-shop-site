
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginToManager = async(req, res)=>{

    const {userName, password} = req.body
    if(!userName || !password)
        return res.status(400).json({message:'Please fill all the require parameters!'})
    const foundUser = await User.findOne({userName}).lean()
    if(!foundUser )
        return res.status(401).json({message: 'Unauthorized'})
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match)
        return res.status(401).json({message:'Unauthorized'})
    if(foundUser.roles=='user')
        return res.status(404).json({message:"You are a user"})

    const userInfo = {_id:foundUser._id, userName:foundUser.userName, phone:foundUser.phone, email:foundUser.email, roles:foundUser.roles, password:foundUser.password }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken, user:userInfo})

}   

module.exports = {loginToManager}