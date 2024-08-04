import jwt from 'jsonwebtoken'


export async function generateJwtToken(id) {
    try {
        const KEY = process.env.JWT_SECRET_KEY
        const payload = {
            id: id,
            exp: Math.floor(Date.now() / 1000) + 12121,
            iat: Math.floor(Date.now() / 1000),
        }
        return jwt.sign(payload, KEY)
    } catch (error) {
        console.log(error)
    }
}

export async function verifyJwt(token) {
    return jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
}
