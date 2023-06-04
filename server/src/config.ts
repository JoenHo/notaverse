// const SERVER_PORT = 3000;
const SERVER_PORT = 8080;
const MONGO_URL = 'mongodb://127.0.0.1:27017/notaverse';
const ATLAS_URL = 'mongodb+srv://notaverse_admin:5SORp7DVWRt9VDZv@cluster0.wxbgpj2.mongodb.net/?retryWrites=true&w=majority';
const GOOGLE_CLIENT_ID = '200997675526-j6gmoo4dm25a65u6ornjn2ouk2c6jbuo.apps.googleusercontent.com';
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