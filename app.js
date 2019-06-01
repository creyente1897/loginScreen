// Required Modules
const express = require('express')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Exported Modules
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-config');
const keys = require('./config/keys');

const PORT = process.env.PORT || 3000 
const app = express()

app.set('view engine', 'ejs')

app.use(express.static("public"))

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true },() => {
  console.log('MongoDB Connection Established');
});

// Set Up Routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, (req, res) => {
    console.log('Server is listening on port 3000');
})