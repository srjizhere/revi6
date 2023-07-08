"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleVerify = void 0;
const roleVerify = (requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roles = req.body.roles;
            const hasRequiredRole = requiredRoles.some((role) => roles.includes(role));
            if (!hasRequiredRole) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Role verify failed' });
        }
    });
};
exports.roleVerify = roleVerify;
//# sourceMappingURL=roleVerify.js.map