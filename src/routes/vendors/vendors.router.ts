import express from "express";

import { httpPostRegisterVendor, httpPostLoginVendor, httpPostLogoutVendor } from "./vendors.controller";

const vendorsRouter = express.Router();

vendorsRouter.post("/signup", httpPostRegisterVendor);
vendorsRouter.post("/login", httpPostLoginVendor);
vendorsRouter.post('/logout', httpPostLogoutVendor);

export { vendorsRouter };
