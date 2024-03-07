const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create an account
router.post("/", async (req,res) => {
    try{
        const {first_name, last_name, middle_name, gender, age, phone, country, weight, height, email, password} = req.body;

        //validation
        if(!first_name || !last_name || !middle_name || !gender || !age || !phone || !country || !weight || !height || !email || !password )
            return res.status(400).json({errorMessage: "Please enter all required fields"});
        
        if (age < 16)
            return res.status(400).json({errorMessage: "You must be of an age 16 or higher"});

        if (!phone.match(/^\d{10,12}$/))
            return res.status(400).json({errorMessage: "Invalid phone"});

        if (!password.match((/^(?=.*[a-z])(?=.*[A-Z])/)))
            return res.status(400).json({errorMessage: "Password must contain both uppercase and lowercase letters"});
        
        if (!password.match((/[\W_]/)))
            return res.status(400).json({errorMessage: "Password must contain special symbol"});

        if (!password.match((/\d/)))
            return res.status(400).json({errorMessage: "Password must contain a number"});   
    
        if (password.length < 8)
            return res.status(400).json({errorMessage: "Password must be at least 8 characters"});         
           
        if (!email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/))
            return res.status(400).json({errorMessage: "Invalid email"});

        //checking for existing user
        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({errorMessage: "Account with this email already exists"});

        //hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //save a new user to DB
        const newUser = new User({
            email, passwordHash, first_name, last_name, middle_name, gender, age, phone, country, weight, height
        });
        const savedUser = await newUser.save();

        //assing token
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        //send token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (err){
        console.error(err);
        res.status(500).send();
    }
})

//login to account
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //validation
        if(!email || !password )
            return res.status(400).json({errorMessage: "Please enter all required fields"});
        
        //checking email
        const existingUser = await User.findOne({email});
        if (!existingUser)
            return res.status(401).json({errorMessage: "Worng credentials"});

        //comparing passwords
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({errorMessage: "Worng credentials"});

        //assing token
        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);

        //send token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();        

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
})

module.exports = router;