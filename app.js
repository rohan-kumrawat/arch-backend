require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const messageRoutes = require('./routes/messageRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const publicRoutes = require('./routes/publicRoutes');
const clientRoutes = require('./routes/clientRoutes');
const guestRoutes = require('./routes/guestRoutes');
const cors = require('cors');
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/slider', sliderRoutes);

app.use('/api/review', reviewRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/guest', guestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
