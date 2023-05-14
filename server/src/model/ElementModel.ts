import { Schema } from 'mongoose';
import { DataAccess } from '../db';
import { IElementModel } from '../interface/IElementModel';
import { ElementType } from "../enums/ElementType"

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ElementModel {
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
            elementId: {type: String, required: true, unique: true, alias: 'id'},
            img_url: { type: String, required: true },
            elementType: { type: String, enum: Object.values(ElementType), required: true},
        }, 
        {
            collection: 'elements'
        });
    }

    /** Create 'Element' collection in MongoDB */
    public createModel(): void {
        this.model = mongooseConnection.model<IElementModel>("Element", this.schema);
    }
}

const elementModel = new ElementModel();
export {ElementModel, elementModel};