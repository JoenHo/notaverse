import mongoose from "mongoose";

interface IRoomModel extends mongoose.Document {
    roomId: string;  // PK
    name: string;
    roomItemIdList: Array<string>;  // for storing IRoomItemModel['roomItemId']
    userId: string; // for storing IUserModel['userId']
}
export {IRoomModel}