import mongoose from "mongoose"
import { Subscription } from "../enums/Subscription"
import { INoteModel } from "./INoteModel";
import { IRoomModel } from "./IRoomModel";

interface IUserModel extends mongoose.Document {
    userId: string;
    username: string;
    plan: Subscription;
    roomIdList: Array<IRoomModel['roomId']>;
    noteIdList: Array<INoteModel['noteId']>;
}
export {IUserModel}