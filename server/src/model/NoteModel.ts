import { Schema } from 'mongoose';
import { DataAccess } from '../db';
import { INoteModel } from '../interface/INoteModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class NoteModel {
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
            noteId: {type: String, required: true, unique: true, alias: 'id'},
            title: { type: String, required: true, default: 'Untitled' },
            img_url: { type: String, required: true },
            content: { type: String, required: true, default: '' },
            userId: { type: String, required: true},
        }, 
        {
            timestamps: true,
            collection: 'notes'
        });
    }

    /** Create 'Note' collection in MongoDB */
    public createModel(): void {
        this.model = mongooseConnection.model<INoteModel>("Note", this.schema);
    }
}

const noteModel = new NoteModel();
export {NoteModel, noteModel};