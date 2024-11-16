function isVendorLogin(req, res, next) {
    const isLogedIn: any = true
    if (!isLogedIn) {
        res.status(401).json({ message: "you are not logedin!" })
    }
    next();
}

export { isVendorLogin };
