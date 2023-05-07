import { Schema } from 'mongoose';
import { DataAccess } from '../db';
import { IRoomItemModel } from '../interface/IRoomItemModel';
import { ElementType } from "../enums/ElementType"

let mongooseConnection = DataAccess.mongooseConnection;

class RoomItemModel {
    public schema: any;
    public model: any;

    /** Constructor */
    public constructor() {
        this.createSchema();
        this.createModel();
    }
    
    /** Create Schema */
    public createSchema(): void {
        this.schema = new Schema({
            roomItemId: {type: String, required: true, unique: true, alias: 'id'},
            roomId: { type: String, required: true},
            itemId: { type: String, required: true},
            elementType: { type: String, enum: Object.values(ElementType), required: true},
            x: { type: Number, required: true, default: 0 },
            y: { type: Number, required: true, default: 0 },            
        }, 
        {
            timestamps: true,
            collection: 'room_items'
        });
    }

    /** Create 'RoomItem' collection in MongoDB */
    public createModel(): void {
        this.model = mongooseConnection.model<IRoomItemModel>("RoomItem", this.schema);
    }
}

const roomItemModel = new RoomItemModel();
export {RoomItemModel, roomItemModel};