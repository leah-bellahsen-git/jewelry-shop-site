
const verifyAdmin = (req, res, next)=>{
    if(req.user && req.user.roles==='admin')
        next()
    else{
        return res.status(401).json({message:'Unauthorized'})
    }
}

module.exports = verifyAdmin