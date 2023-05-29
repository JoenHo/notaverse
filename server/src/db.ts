import Mongoose = require('mongoose');
import { config } from './config';

class DataAccess {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;

  static DB_CONNECTION_STRING: string =
    'mongodb+srv://notaverse_admin:5SORp7DVWRt9VDZv@cluster0.wxbgpj2.mongodb.net/?retryWrites=true&w=majority';

  /** Constructor for DataAccess class */
  constructor() {
    DataAccess.connect();
  }

  /** Connect to MongoDB though mongoose */
  static connect(): Mongoose.Connection {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.on('open', () => {
      console.log('Connected to mongodb.');
    });

    this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
    return this.mongooseInstance;
  }
}
DataAccess.connect();
export { DataAccess };
