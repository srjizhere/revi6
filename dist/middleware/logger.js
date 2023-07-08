"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.default = (req, res, next) => {
    const url = req.originalUrl;
    fs.appendFile("logger.txt", "\n" + ` IP : ${req.ip} [${new Date().toDateString()}] ${req.originalUrl}  ${req.method}`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(` IP :${req.ip} | Date -:[${new Date().toDateString()}] ${req.method} ${req.originalUrl} `);
        }
    });
    next();
};
//# sourceMappingURL=logger.js.map