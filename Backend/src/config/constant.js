export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "test";
export const JWT_EXPIRES = process.env.JWT_EXPIRES || "24h";

export const tokenName = "__test-user-token";
export const tokenOptions = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: false,
};