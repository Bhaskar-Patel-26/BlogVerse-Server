import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({sucess: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});   
    }
}