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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const userRouter_1 = require("./router/userRouter");
const bookRouter_1 = require("./router/bookRouter");
const logger_1 = __importDefault(require("./middleware/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.default);
const PORT = process.env.PORT || 8080;
app.use("/api/user", userRouter_1.userRouter);
app.use("/api/books", bookRouter_1.BookRouter);
app.get("/", (req, res) => {
    res.send({ message: 'this is a base router' });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connection)();
        console.log("Connection to DB successful");
        console.log(`SERVER RUNNING ON ${PORT}`);
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=index.js.map