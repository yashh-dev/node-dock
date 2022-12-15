const User = require("../models/userModel")
const bcrypt = require("bcrypt");
exports.signUp = async(req,res) => {
    console.log("you are in signup");
    try{
        const {username, password} = req.body;
        const hashedPasswd = await bcrypt.hash(password,12);
        const user = await User.create({username,password:hashedPasswd});
        res.status(201).json(
            {
                status: "success",
                data: {
                    user
                }
            })
    }catch(e){
        res.status(400).json(
            {
                status: "Failed"
            }
        )
    }
}

exports.login = async (req,res) => {
    
    const {username, password} = req.body;
    
        const user = await User.findOne({username:username})
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user not found"
            })
        }
        const isCorrect = await bcrypt.compare(password,user.password);
        if(isCorrect){
            req.session.user = user
            res.status(200).json(
                {
                    status: "success",
                    message: "Logged In"
                })
        }else{
            res.status(400).json(
                {
                    status: "Failed",
                    message: "incorrect username or password"
                }
            )
        }
        
    
    
    
}