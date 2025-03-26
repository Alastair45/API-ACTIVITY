import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;


export default function auth(req, res, next){
    const authHeader = req.headers.authorization;
    

    if (!authHeader){
        res.status(401).json({message: "Unauthorized Access"});

    }

    const key = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    if (authHeader === secretKey){
        next();
    }
    else {
        res.status(401).json({message: "Wrong Password"});
    }
}