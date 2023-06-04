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
            }, (accessToken: any, refreshToken: any, profile: any, done: any) => {
                console.log("Inside new password google strategy");
                process.nextTick( () => {
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