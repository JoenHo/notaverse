import mongoose from "mongoose";
import { IRoomModel } from "./IRoomModel";
import { INoteModel } from "./INoteModel";

interface IRoomItemModel extends mongoose.Document {
    roomItemId: string;
    roomId: IRoomModel['roomId'];
    itemId: INoteModel['noteId'];
    x: number;
    y: number;
}
export {IRoomItemModel}