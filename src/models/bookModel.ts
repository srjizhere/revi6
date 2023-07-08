import mongoose , {Schema , Document} from "mongoose";

export interface IBook extends Document {
    title : string;
    description : string;
    createdBy : mongoose.Types.ObjectId;
    createdAt : Date;
}


const bookSchema: Schema = new Schema(
    {
      title: { type: String, required: true },
      description : { type: String, required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
  );
  
  export const Book = mongoose.model<IBook>('Book', bookSchema);