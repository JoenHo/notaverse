import {Schema} from 'mongoose';
import { DataAccess } from '../db';
import { IUserModel } from '../interface/IUserModel';
import { Subscription } from '../enums/Subscription';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
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
            username: {type: String, required: true},
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true, unique: true},
            plan: {type: String, enum: Object.values(Subscription), default: Subscription.Basic, required: true},
            roomList: [{type: Schema.Types.ObjectId, ref: 'rooms', required: false}],
            itemList: [{type: Schema.Types.ObjectId, ref: 'notes', required: false}],
        }, {collection: 'users'});
    }

    /** Create 'User' collection in MongoDB */
    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }
}

const userModel = new UserModel();
export {UserModel, userModel};