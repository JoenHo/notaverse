// const SERVER_PORT = 3000;
const SERVER_PORT = 8080;
const MONGO_URL = 'mongodb://127.0.0.1:27017/notaverse';
const ATLAS_URL = 'mongodb+srv://notaverse_admin:5SORp7DVWRt9VDZv@cluster0.wxbgpj2.mongodb.net/?retryWrites=true&w=majority';
const GOOGLE_CLIENT_ID = '241156039018-672vr2ogqejvlcb2um2em0md49uhh6fm.apps.googleusercontent.com';
const GOOGLE_SECRET_ID = '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';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    mongo_atlas: {
        url: ATLAS_URL
    },
    server: {
        port: SERVER_PORT
    },
    google_auth: {
        client_id: GOOGLE_CLIENT_ID,
        secret_id: GOOGLE_SECRET_ID
    }
};