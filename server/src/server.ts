import express from 'express';
import mongoose from 'mongoose';
import {config} from './config';
import {App} from './app';

/** Connect to Mongo DB */
mongoose.connect(config.mongo.url).then(() => {
    console.log('Connected to MongoDB!')
    startServer();
}).catch((err) => {
    console.log('Unable to MongoDB: ', err);
})

/** Start Express App */
const startServer = () => {
    let server: any = new App().expressApp;
    server.listen(config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}\n`);
    });
};
