const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => res.json({ message: 'Hello world!' }));
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log('Server running on port ' + PORT));
