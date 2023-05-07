import mongoose from "mongoose";

interface INoteModel extends mongoose.Document {
    noteId: string; // PK
    title: string;
    img_url: string;
    content: string;
    userId: string; // for storing IUserModel['userId']
}
export {INoteModel}