const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const ResultRoutes = require('./routes/ResultRoute')

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',                // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],      // Allowed HTTP methods
    credentials: true,                              // Enable cookies and other credentials if needed
}));

app.use(express.json());                // Middleware to parse JSON data

// Connect to MongoDB
connectDB();

// Test Route for server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use test routes
app.use('/api/results', ResultRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
