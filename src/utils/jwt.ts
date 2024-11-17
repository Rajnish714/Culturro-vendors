import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with a secure key

export function generateToken(payload: object): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): object | null {
    try {
        const decriptedToken = jwt.verify(token, secretKey);
        console.log("token hai", decriptedToken);
        return decriptedToken


    } catch (error) {
        return null;
    }
}
