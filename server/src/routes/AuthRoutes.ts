import express from 'express';
import passport from 'passport';
import {userController} from '../controllers/UserController';

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
    
      // find user in db
      userController.findByOauthId(user.id)
        .then((data: any) => {
            if(data == null){
                console.log('User with OauthID ' + user.id + ' not found in DB');
                return res.redirect('/');
            };
            // store google profile in session
            req.session.user = {
                displayName: user.displayName,
                profilePhoto: user.photos[0].value
            };
            // redirect to user home page 
            return res.redirect('/#/home/' + data.userId);
        }).catch((err:any) => {
            console.log(err);
            return res.redirect('/');
        });
    })(req, res, next);
};

/** Define routes */
const router = express.Router();
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
export = router;
