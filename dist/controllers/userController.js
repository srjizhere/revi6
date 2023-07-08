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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.Register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, roles } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ msg: "User already exists" });
        }
        const hash = yield bcrypt_1.default.hash(password, 5);
        const user = yield new userModel_1.User({ email, username, password: hash, roles });
        user.save();
        res.status(201).send({ msg: "Registration sucessfull" });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "Failed to create User" });
    }
});
exports.Register = Register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: "User doesn't exist, Please login" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username, roles: user.roles }, process.env.SECRET_KEY);
        res.status(201).send({ msg: "Login Sucessful", token });
    }
    catch (error) {
        console.log("Login error", error);
        res.status(500).send({ msg: "Failed to login User" });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map