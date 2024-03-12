const router = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create an account
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, middle_name, gender, age, phone, country, weight, height, email, password } = req.body;

        //validation
        if (!first_name || !last_name || !middle_name || !gender || !age || !phone || !country || !weight || !height || !email || !password)
            return res.status(400).json({ errorMessage: "Please enter all required fields" });

        if (age < 16)
            return res.status(400).json({ errorMessage: "You must be of an age 16 or higher" });

        if (!phone.match(/^\d{10,12}$/))
            return res.status(400).json({ errorMessage: "Invalid phone" });

        if (!password.match((/^(?=.*[a-z])(?=.*[A-Z])/)))
            return res.status(400).json({ errorMessage: "Password must contain both uppercase and lowercase letters" });

        if (!password.match((/[\W_]/)))
            return res.status(400).json({ errorMessage: "Password must contain special symbol" });

        if (!password.match((/\d/)))
            return res.status(400).json({ errorMessage: "Password must contain a number" });

        if (password.length < 8)
            return res.status(400).json({ errorMessage: "Password must be at least 8 characters" });

        if (!email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/))
            return res.status(400).json({ errorMessage: "Invalid email" });

        //checking for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ errorMessage: "Account with this email already exists" });

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

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

//login to account
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter all required fields" });

        //checking email
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Worng credentials" });

        //comparing passwords
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Worng credentials" });

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

//check if loggedin
router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);

    } catch (err) {
        res.json(false);
    }
})

//check if user already exists
router.get('/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//forgot password link for existing user
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        //validation
        if (!email)
            return res.status(400).json({ errorMessage: "Please enter all required fields" });

        if (existingUser) {
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ email: existingUser.email }, secret, { expiresIn: '5m' });
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Reset Password",
                html: `<h1>Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="http://localhost:3000/reset-password/${token}">Reset password</a>
            <p>The link will expire in 5 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`,
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).send({ message: err.message });
                }
                res.status(200).send({ message: "Email sent" });
            })
        } else {
            return res.status(401).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//rest password
router.post("/reset-password/:token", async (req, res) => {
    try {
        const decodedToken = jwt.verify(
            req.params.token,
            process.env.JWT_SECRET
        );

        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(401).send({ message: "no user found" });
        }

        if (user) {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

            // Update user's password, clear reset token and expiration time
            user.passwordHash = req.body.newPassword;
            await user.save();

            // Send success response
            res.status(200).send({ message: "Password updated" });
        }


    } catch (err) {
        res.status(500).send({ message: err.message });
    }

})

module.exports = router;