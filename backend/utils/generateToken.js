import jwt from 'jsonwebtoken';

export const generateToken = (userId)=>{
    try {
        const secretKey = process.env.JWT_SECRET;
        if(!secretKey){
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({id: userId}, secretKey, {expiresIn:'7d'});
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}