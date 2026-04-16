const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// Heartbeat: Neural Engine Sync

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const weightRoutes = require('./routes/weightRoutes');
const photoRoutes = require('./routes/photoRoutes');
const insightRoutes = require('./routes/insightRoutes');
const aiRoutes = require('./routes/aiRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const compositionRoutes = require('./routes/compositionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const planRoutes = require('./routes/planRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use((req, res, next) => {
    // Strip /server-api if it exists to normalize for the routes below
    if (req.url.startsWith('/server-api')) {
        req.url = req.url.replace('/server-api', '/api');
    }
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/composition', compositionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/plans', planRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to FitformaX API' });
});

app.use(notFound);
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

module.exports = app;

// Restart Trigger: 2026-04-16 19:47:00