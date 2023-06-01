import express, { NextFunction, Request, Response} from 'express';
import passport from 'passport';

/** Authenticate with Google */
const googleAuth = passport.authenticate('google', {scope: ['profile']});

/** Google callback URL */
const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' }, (req: Request, res: Response) => {
        console.log("successfully authenticated user and returned to callback page.");
        let user_id = '42ab8ffd-2367-44fd-9568-87a19134053a'    // TODO
        res.redirect('/#/home/' + user_id);
    });

/** Define routes */
const router = express.Router();
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
export = router;
