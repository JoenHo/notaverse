import { Schema } from 'mongoose';
import { DataAccess } from '../db';
import { IRoomModel } from '../interface/IRoomModel';

let mongooseConnection = DataAccess.mongooseConnection;

class RoomModel {
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
            roomId: {type: String, required: true, unique: true, alias: 'id'},
            userId: {type: String, required: true},
            name: { type: String, required: true, default: 'Untitled' },
            roomItemIdList: [{ type: String, required: false }],
        }, 
        {
            timestamps: true,
            collection: 'rooms'
        });
    }

    /** Create 'Room' collection in MongoDB */
    public createModel(): void {
        this.model = mongooseConnection.model<IRoomModel>("Room", this.schema);
    }
}

const roomModel = new RoomModel();
export {RoomModel, roomModel};