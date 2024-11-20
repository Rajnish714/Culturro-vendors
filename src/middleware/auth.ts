import { verifyToken } from "../utils/jwt";

function verifyTokenOnload(req, res, next) {


    if (!req.headers["authorization"]) {
        throw new Error("no authorization token found!")
    }


    const token = String(req.headers["authorization"]).split(" ")[1]
    console.log(token);
    if (token) {
        const verifiedUser = verifyToken(token);

        if (verifiedUser) {

            req.user = verifiedUser


        }
    }

    next();
};
function isVendorLogin(req, res, next) {
    const isLogedIn = req.user
    if (!isLogedIn) {
        return res.status(401).json({ error: "you must login" })
    }
    next();
};

export { verifyTokenOnload, isVendorLogin }


