import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config';

// Configure Google Passport
class GooglePassport {

    clientId: string;
    secretId: string;
     
    constructor() { 
        this.clientId = config.google_auth.client_id;
        this.secretId = config.google_auth.secret_id;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback"
            }, (accessToken, refreshToken, profile, done) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user: any, done: (arg0: any, arg1: any) => void) {
            done(null, user);
        });

        passport.deserializeUser(function(user: any, done: (arg0: any, arg1: any) => void) {
            done(null, user);
        });
    }
}
export default GooglePassport;