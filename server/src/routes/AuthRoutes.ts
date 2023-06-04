import express from 'express';
import passport from 'passport';

/** Authenticate with Google */
const googleAuth = passport.authenticate('google', {scope: ['profile']});

/** Google callback URL */
const googleAuthCallback = (req: any, res: any, next: any) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
      if (err) {
        return res.redirect('/');
      }
      if (!user) {
        return res.redirect('/');
      }  
      console.log("successfully authenticated user and returned to callback page.");
      console.log('user:', user);
      
      let user_id = '42ab8ffd-2367-44fd-9568-87a19134053a'; // TODO: Replace with actual user ID
      res.redirect('/#/home/' + user_id);
    })(req, res, next);
};

/** Define routes */
const router = express.Router();
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
export = router;
