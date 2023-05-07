import mongoose from "mongoose";
import { ElementType } from "../enums/ElementType"

interface IRoomItemModel extends mongoose.Document {
    roomItemId: string;  // PK
    roomId: string;   // for storing IRoomModel['roomId']
    itemId: string;   // for storing item ID such as INoteModel['noteId']
    elementType: ElementType,
    x: number;
    y: number;
}
export {IRoomItemModel}