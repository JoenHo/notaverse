import mongoose from 'mongoose';
import { config } from './config';

class DataAccess {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  static DB_CONNECTION_STRING: string =
    'mongodb+srv://notaverse_admin:5SORp7DVWRt9VDZv@cluster0.wxbgpj2.mongodb.net/?retryWrites=true&w=majority';

  /** Constructor for DataAccess class */
  constructor() {
    DataAccess.connect();
  }

  /** Connect to MongoDB though mongoose */
  static connect(): Promise<mongoose.Connection> {
    if (this.mongooseInstance) return Promise.resolve(this.mongooseInstance);
    this.mongooseConnection = mongoose.connection;
    this.mongooseInstance = mongoose.connect(config.mongo.url);
    return this.mongooseInstance;
  }
}
DataAccess.connect();
export { DataAccess };
