import { verifyToken } from "../utils/jwt";


function verifyTokenOnload(req, res, next) {

    const token = req.session.token;
    console.log("Token received in header: ", token);

    if (token) {
        const verifiedUser = verifyToken(token);

        if (verifiedUser) {
            req.session.user = verifiedUser;

            console.log("User set in session: ", req.session.user);
        }
    }

    next();
}; function isVendorLogin(req, res, next) {
    if (req.session && req.session.user) {
        res.locals.loggedIn = true;
        res.locals.userName = req.session.user.name;
    }
    else {
        res.locals.loggedIn = false;
        res.locals.userName = null;
    }
    next();
};

export { verifyTokenOnload, isVendorLogin };


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