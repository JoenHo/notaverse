import mongoose from 'mongoose';
import {config} from './config';

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: mongoose.Connection;

    /** Constructor for DataAccess class */
    constructor () {
        DataAccess.connect();
    }
    
    /** Connect to MongoDB though mongoose */
    static connect (): Promise<mongoose.Connection> {
        if(this.mongooseInstance) return Promise.resolve(this.mongooseInstance);
        this.mongooseConnection  = mongoose.connection;
        this.mongooseInstance = mongoose.connect(config.mongo.url);
        return this.mongooseInstance;
    }
}
DataAccess.connect();
export {DataAccess};