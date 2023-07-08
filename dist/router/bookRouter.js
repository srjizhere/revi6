"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const roleVerify_1 = require("../middleware/roleVerify");
const userModel_1 = require("../models/userModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
exports.BookRouter = router;
router.post("/", authMiddleware_1.authMiddlware, (0, roleVerify_1.roleVerify)([userModel_1.UserRole.CREATOR]), bookController_1.createBooks);
router.get("/", authMiddleware_1.authMiddlware, (0, roleVerify_1.roleVerify)([userModel_1.UserRole.VIEWER, userModel_1.UserRole.VIEW_ALL]), bookController_1.viewBooks);
//# sourceMappingURL=bookRouter.js.map