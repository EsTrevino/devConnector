const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.server = http.createServer(app);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log('Server running on port ' + PORT));
