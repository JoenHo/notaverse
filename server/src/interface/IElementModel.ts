import mongoose from "mongoose";
import { ElementType } from "../enums/ElementType"

interface IElementModel extends mongoose.Document {
    elementId: string; // PK
    elementType: ElementType;
    img_url: string;
}
export {IElementModel}