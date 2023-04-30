import mongoose from "mongoose"
import { Subscription } from "../enums/Subscription"
import { INoteModel } from "./INoteModel";
import { IRoomModel } from "./IRoomModel";

interface IUserModel extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    plan: Subscription;
    roomList: Array<IRoomModel>;
    itemList: Array<INoteModel>;
}
export {IUserModel}