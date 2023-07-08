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
exports.createBooks = exports.viewBooks = void 0;
const userModel_1 = require("../models/userModel");
const bookModel_1 = require("../models/bookModel");
const viewBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roles, userId } = req.body;
        if (roles.includes(userModel_1.UserRole.VIEW_ALL)) {
            const { old, new: newBooks } = req.query;
            let mongo_query = {};
            if (old) {
                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000); //ten mins ago
                mongo_query = Object.assign(Object.assign({}, mongo_query), { createdAt: { $lte: tenMinsAgo } });
            }
            else if (newBooks) {
                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
                mongo_query = Object.assign(Object.assign({}, mongo_query), { createdAt: { $gt: tenMinsAgo } });
            }
            const books = yield bookModel_1.Book.find(mongo_query);
            return res.status(200).json({ books }).end();
        }
        if (roles.includes(userModel_1.UserRole.VIEWER)) {
            const { old, new: newBooks } = req.query;
            let mongo_query = { createdBy: userId };
            if (old) {
                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
                let createdAt = { $lte: tenMinsAgo };
                mongo_query = Object.assign(Object.assign({}, mongo_query), { createdAt: { $lte: tenMinsAgo.toISOString() } });
            }
            else if (newBooks) {
                const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
                mongo_query = Object.assign(Object.assign({}, mongo_query), { createdAt: { $gt: tenMinsAgo.toISOString() } });
            }
            const books = yield bookModel_1.Book.find(mongo_query);
            return res.status(200).json({ books }).end();
        }
        return res.json({ books: [] });
    }
    catch (error) {
        console.error(error);
        res.status(501).json({ err: error.message });
    }
});
exports.viewBooks = viewBooks;
const createBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId } = req.body;
        const book = yield new bookModel_1.Book({
            title,
            description,
            createdBy: userId,
            createdAt: new Date(),
        });
        book.save();
        res.status(201).json({ message: "Book created", book: book });
    }
    catch (error) {
        console.error("Failed to create book:", error);
        res.status(500).json({ message: "Failed to create book" });
    }
});
exports.createBooks = createBooks;
//# sourceMappingURL=bookController.js.map