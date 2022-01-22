const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
// [ROUTE 1]CREate a user using : POST endpoint "/api/auth/createuser" doesnt require auth

const JWT_SECRET="qualitycontrol";

router.post('/createuser',[
  body('name','Enter a valid name').isLength({min:3}),
  body('email','Enter a valid email').isEmail(),
  body('password','Password must be atleast 5 characters').isLength({min:5})

],async(req,res)=>{
  //IF THERE ARE ERRORS RETURN BAD REQUEST AND THE ERRORS
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    // Making password secured (creating hash and adding salt)
    const salt = await bcrypt.genSalt(10);
    secpass= await bcrypt.hash(req.body.password,salt);

    //CHECK WHETHER THE USER WITH THIS EMAIL EXISTS ALREADY
    try{

    let user = await User.findOne({email:req.body.email})
    console.log(user);
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    //CREATE A NEW USER
    user = await User.create({
      name:req.body.name,
      password:secpass,
      email:req.body.email
    });
    // .then(user=>res.json(user))
    // .catch(error=>{console.log(error)
    // res.json({error:"Please enter a valid value",message:error.message})})
const data={
  user:{
    id:user.id
  }
};
const authtoken = jwt.sign(data,JWT_SECRET);
console.log(authtoken);
res.json(authtoken);

}catch(error){
  console.error(error.message);
  res.status(500).send("some error occured");
}

})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


//[ROUTE 2] AUTHENTICATE A USER :POST "api/auth/login" no login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()
],async(req,res)=>{
  //IF THERE ARE ERRORS RETURN BAD REQUEST AND THE ERRORS
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    try {
      let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
          return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const data = {
          user:{
            id:user.id,
          }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

})


// GET LOGGED-IN USER DETAILS USING POST api/auth/getuser- LOGIN IS REQUIRED
router.post('/getuser',fetchuser,async(req,res)=>{
try {
 userId= req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (e) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

})




module.exports=router
