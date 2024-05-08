
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async(req, res)=>{

    const {userName, password} = req.body
    if(!userName || !password)
        return res.status(400).json({message:'Please fill all the require parameters!'})
    const foundUser = await User.findOne({userName}).lean()
    if(!foundUser )
        return res.status(401).json({message: 'Unauthorized'})
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match)
        return res.status(401).json({message:'Unauthorized'})
    //if(foundUser.roles=='user')

    const userInfo = {_id:foundUser._id, userName:foundUser.userName, phone:foundUser.phone, email:foundUser.email, roles:foundUser.roles, password:foundUser.password }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken, user:userInfo})

}   

const register = async(req, res)=>{
    console.log("I am in the register func");
    const {userName, phone, email, roles, password} = req.body
    if(!userName || !password)
        return res.status(400).json({message:'Please fill all the require parameters!'})
    const duplicate = await User.findOne({userName}).lean()
    if(duplicate)
        return res.status(409).json({message:"Duplicate userName"})

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = {userName, phone, email, roles, password: hashedPwd}
    const user = await User.create(userObject)
    if(user)
        return res.status(201).json({message:`${user.userName} created`})
    return res.status(400).json({message:'invalid user received'})
}

module.exports = {login, register}