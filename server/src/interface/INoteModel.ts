import mongoose from "mongoose";
import { IUserModel } from "./IUserModel";

interface INoteModel extends mongoose.Document {
    title: string;
    img_url: string;
    content: string;
    user: IUserModel;
}
export {INoteModel}