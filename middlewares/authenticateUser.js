module.exports = (req,res,next)=>{
    if(!req.session.user){
        res.send("please send the feedback");
        return;
    }
    //else
    next();
};