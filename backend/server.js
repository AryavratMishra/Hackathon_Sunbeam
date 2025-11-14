require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('./models'); // loads associations

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const shareRoutes = require('./routes/shares');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/shares', shareRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}).catch(err => {
  console.error('DB sync failed:', err);
});
