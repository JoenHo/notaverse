import mongoose from "mongoose";
import { IRoomModel } from "./IRoomModel";
import { IItemModel } from "./IItemModel";

interface IRoomItemModel extends mongoose.Document {
    room: IRoomModel;
    item: IItemModel;
    x: number;
    y: number;
}
export {IRoomItemModel}