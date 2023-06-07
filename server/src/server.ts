import {config} from './config';
import {App} from './app';
import { DataAccess } from './db';

/** Connect to Mongo DB */
DataAccess.connect().then(() => {
    console.log('Connected to MongoDB!')
    startServer();
}).catch((err) => {
    console.log('Unable to MongoDB: ', err);
})

/** Start Express App */
const startServer = () => {
    let server: any = new App().expressApp;
    server.listen(process.env.port || config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}\n`);
    });
};
