import db from "../data.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";



const router = express.Router();



// register route

router.post("/register", async (req,  res) =>{

    const {username, password, email} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result =await db.query("INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);
        res.status(201).json({ message: 'User registered', user: result.rows[0] });  
    } catch (err){
        console.log("Error while resgistering the user", err);
        res.status(500).json({ error: 'Registration failed' });
    }
});



// loging router

router.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    try{
        const result = await db.query("SELECT * FROM users WHERE email= $1", [email]);
        const user  = result.rows[0];
        if (!user) return res.status(400).json({error : "user not found"});

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err){
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }

});

// create a get request to vefiy token

router.get("/verify", async(req, res)=>{
    const authHeader = req.header["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" })

     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send(200).json({user: "vefified"});
    } catch (error){ 
         res.status(403).json({ error: "Invalid or expired token" });
    }
    });


  


export default router;