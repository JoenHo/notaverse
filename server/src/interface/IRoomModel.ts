import mongoose from "mongoose";
import { IRoomItemModel } from "./IRoomItemModel";
import { IUserModel } from "./IUserModel";

interface IRoomModel extends mongoose.Document {
    roomId: string;
    name: string;
    roomItemIdList: Array<IRoomItemModel['roomItemId']>;
    userId: IUserModel['userId'];
}
export {IRoomModel}