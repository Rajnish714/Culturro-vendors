import { verifyToken } from "../utils/jwt";
import { Request } from "express"
// interface newRequestObject extends Request {
//     header: { authorization: string }
// }
function verifyTokenOnload(req, res, next) {

    if (!req.headers["authorization"]) {
        throw new Error("error hai")
    }
    const token = String(req.headers["authorization"]).split(" ")[1] // Access the token from the cookie if (!token) return res.status(401).json({ message: 'Unauthorized' });




    if (token) {

        const verifiedUser = verifyToken(token);



        if (verifiedUser) {
            //req.user = verifiedUser;
            req.user = verifiedUser



        }
    }

    next();
};
function isVendorLogin(req, res, next) {
    const isLogedIn = true
    if (!isLogedIn) {
        return res.status(401).json({ error: "you must login" })
    }
    next();
};

export { verifyTokenOnload, isVendorLogin } // };


// import { verifyToken } from "../utils/jwt";

// function isVendorLogin(req, res, next) {
//     if (req.session && req.session.user) {
//         res.locals.loggedIn = true;
//         res.locals.userName = req.session.user.name;
//     } else {
//         res.locals.loggedIn = false;
//         res.locals.userName = null;
//     }
//     next();
// }



// //jwt token verification in header
// function verifyTokenOnload(req, res, next) {
//     const token = req.headers['authorization'];
//     console.log("ye load pr hai", token);

//     if (token) {
//         const verifiedUser = verifyToken(token);
//         if (verifiedUser) {
//             req.session.user = verifiedUser;
//             console.log("ye load pr hai", req.session.user);

//         }
//     }
//     next();
// };
// export { isVendorLogin, verifyTokenOnload };