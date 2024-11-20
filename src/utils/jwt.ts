import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export function generateToken(payload: object): string {
    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
}

export function verifyToken(token: string): object | null {
    try {
        const decriptedToken = jwt.verify(token, secretKey);


        return decriptedToken

    } catch (error) {
        return null;
    }
}
