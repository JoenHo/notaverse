import express from 'express';
import * as bodyParser from 'body-parser';

class App {

    public expressApp: express.Application;

    /** Constructor for App class */
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }

    /** Configure Express middleware */
    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    /** Configure API endpoints */
    private routes(): void {
        let router = express.Router();

        /** Log request */
        router.use((req, res, next) => {
            console.log(`INCOMING -> METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            next();
        });
        
        /** Error handling */
        router.use((req, res, next) => {
            const error = new Error('Invalid URL');
            res.status(404).json({
                message: error.message
            });
        });

        /** Health check */
        router.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}));

        /** adds the router middleware to the Express app */
        this.expressApp.use('/', router);
    };
}
export {App};