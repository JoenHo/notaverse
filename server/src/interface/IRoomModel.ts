import mongoose from "mongoose";
import { IRoomItemModel } from "./IRoomItemModel";
import { IUserModel } from "./IUserModel";

interface IRoomModel extends mongoose.Document {
    name: string;
    items: Array<IRoomItemModel>;
    user: IUserModel;
}
export {IRoomModel}