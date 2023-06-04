import mongoose from "mongoose"
import { Subscription } from "../enums/Subscription"

interface IUserModel extends mongoose.Document {
    userId: string;  // PK
    oauthId: string;
    plan: Subscription;
    roomIdList: Array<string>; // for storing IRoomModel['roomId']
    noteIdList: Array<string>; // for storing INoteModel['noteId']
}
export {IUserModel}