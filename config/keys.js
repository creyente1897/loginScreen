module.exports = {
    google: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    },
    mongodb: {
        dbURI: process.env.MONGOURI
    },
    session: {
        cookieKey: process.env.COOKIEKEY
    }
}