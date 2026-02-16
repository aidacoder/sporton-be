import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-models";

const JWT_SECRET = process.env.JWT_SECRET || "sporton123";

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // cek user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credential, email not found" });
      return;
    }

    // cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credential, wrong password" });
      return;
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const initateAdmin = async( req:Request,res:Response):Promise <void> =>{
    try{
        const { email,password,name }= req.body;

        // check if user data/entry is exsit

        const count = await User.countDocuments({});
        if (count >0){
            res.status(400).json({
                message:"we can only have 1 admin user, if you want to create admin user ,please delete  the user manually from the dtabase"
            })
            return
        }
        const salt =await bcrypt.genSalt(10);
        const hashedpassword =await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            password:hashedpassword,
            name
        });
        
        await newUser.save();

        res.status(201).json({message:"Admin user create succesfully"});
    }catch(error){
        console.error(" initiate  new admin user error:",error);
        res.status(500).json({message:"internal server error"})
    }
}
