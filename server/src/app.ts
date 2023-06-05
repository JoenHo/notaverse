import express, { NextFunction, Request, Response}  from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import GooglePassport from './auth/google_passport';
import userRoutes from './routes/UserRoutes';
import noteRoutes from './routes/NoteRoutes';
import roomRoutes from './routes/RoomRoutes';
import roomItemRoutes from './routes/RoomItemRoutes';
import elementRoutes from './routes/ElementRoutes';
import authRoutes from './routes/AuthRoutes';

class App {

    public expressApp: express.Application;
    public googlePassport: GooglePassport;

    /** Constructor for App class */
    constructor() {
        this.googlePassport = new GooglePassport();
        this.expressApp = express();
        this.middleware();
        this.routes();
    }

    /** Configure Express middleware */
    private middleware(): void {
        this.expressApp.use(session({ secret: 'very-very-secret-key', resave: true, saveUninitialized: true }));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(cors());
    }

    /** Validate User Authentication */
    private validateAuth(req: Request, res: Response, next: NextFunction):void {
        if (req.isUnauthenticated()) { console.log("user is authenticated"); return next(); }
        console.log("user is not authenticated");
        res.redirect('/');
    }

    /** Configure API endpoints */
    private routes(): void {
        let router = express.Router();

        /** Log request */
        router.use((req, res, next) => {
            console.log(`INCOMING -> METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            next();
        });

        /** Routes */
        router.use('/auth', authRoutes);
        router.use('/user', this.validateAuth, userRoutes);
        router.use('/note', this.validateAuth, noteRoutes);
        router.use('/room', this.validateAuth, roomRoutes);
        router.use('/roomItem', this.validateAuth, roomItemRoutes);
        router.use('/element', this.validateAuth, elementRoutes);

        /** Set static routes */
        router.use('/assets', express.static(__dirname + '/assets/element_imgs'));
        router.use('', express.static(__dirname+'/../angularDist'));

        /** Health check */
        router.get('/ping', (req, res, next) => {
            res.status(200).json({message: 'pong'})
        });
        
        /** Error handling */
        router.use((req, res, next) => {
            const error = new Error('Invalid URL');
            res.status(404).json({
                message: error.message
            });
        });

        /** adds the router middleware to the Express app */
        this.expressApp.use('/', router);
    };
}
export {App};