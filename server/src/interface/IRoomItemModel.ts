import mongoose from "mongoose";
import { IRoomModel } from "./IRoomModel";
import { INoteModel } from "./INoteModel";

interface IRoomItemModel extends mongoose.Document {
    room: IRoomModel;
    item: INoteModel;
    x: number;
    y: number;
}
export {IRoomItemModel}