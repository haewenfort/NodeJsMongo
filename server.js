const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('passport');

//Configure express to use cors
const check = app.use(cors());

console.log(check);

// Configure express to read body from a POST request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection string
const db = keys.mongoURI;

// Connect to mongo with mongoose
mongoose
    .connect(db, {})
    .then(()=> console.log("Db Connected"))
    .catch(err => console.log(err));

// Init passportjs
app.use(passport.initialize());

// Import the function from file the and invoke immediately
require('./config/passport')(passport);

// User rotues
const userRoutes = require('./routes/User');
app.use('/users', passport.authenticate('jwt', {session:false}), userRoutes);

// Post routes
const postRoutes = require('./routes/Post');
app.use('/posts', passport.authenticate('jwt', {session:false}), postRoutes);

// Auth routes
const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);

// Method: GET
// The homepage
app.get('/', (req, res) => res.json({
    msg: "Hello Amingo!!"
}));

app.post('/register-user', (req, res) => {
    res.json({msg: 'done'});
})

// If port is specified, user it. Otherwise default to 5000
const port = process.env.PORT || 5000;

// Connect to the port.
app.listen(port, () => console.log(`Your application is running @ http://localhost:${port}`));