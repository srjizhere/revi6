import express from "express";
import { UserRole } from "../models/userModel";
import { Book } from "../models/bookModel";
export const viewBooks = async (req: express.Request, res: express.Response) => {
  try {
    const { roles , userId } = req.body;
    if(roles.includes(UserRole.VIEW_ALL)){
      const {old , new : newBooks } = req.query;
      let mongo_query :any = {}
        if (old) {
            const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);   //ten mins ago
            mongo_query = { ...mongo_query, createdAt: { $lte: tenMinsAgo } };
          } else if (newBooks) {
            const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
            mongo_query = { ...mongo_query, createdAt: { $gt: tenMinsAgo } };
          }
          const books = await Book.find(mongo_query);
          return res.status(200).json({ books }).end();
    }
    if(roles.includes(UserRole.VIEWER)){
      const { old, new: newBooks } = req.query;
      let mongo_query:any = { createdBy : userId}
      if (old) {
        const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
        let createdAt :any= { $lte: tenMinsAgo }
        mongo_query = { ...mongo_query, createdAt: { $lte: tenMinsAgo.toISOString()}};
      } else if (newBooks) {
        const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
        mongo_query = { ...mongo_query, createdAt : { $gt: tenMinsAgo.toISOString()}};
      }

      const books = await Book.find(mongo_query);
      return res.status(200).json({ books }).end()
    }
   return res.json({ books: [] });
  } catch (error) {
    console.error(error);
    res.status(501).json({ err:error.message });
  }
};


export const createBooks = async (req: express.Request, res: express.Response) => {
  try {
    const { title, description, userId } = req.body;

    const book = await new Book({
      title,
      description,
      createdBy: userId,
      createdAt: new Date(),
    });

    book.save();

    res.status(201).json({ message: "Book created", book: book });
  } catch (error) {
    console.error("Failed to create book:", error);
    res.status(500).json({ message: "Failed to create book" });
  }
};
