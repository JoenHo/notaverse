import mongoose from "mongoose";
import { IUserModel } from "./IUserModel";

interface INoteModel extends mongoose.Document {
    noteId: string;
    title: string;
    img_url: string;
    content: string;
    user: IUserModel['userId'];
}
export {INoteModel}