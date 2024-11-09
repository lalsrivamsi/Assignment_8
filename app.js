const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import the User model
const Parking = require('./models/Parking'); // Import the Parking model
const app = express();
const PORT = process.env.PORT || 9988;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views folder
app.set('views', path.join(__dirname, 'views')); // Ensure the views folder is in the correct path
app.set('view engine', 'pug');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to the Hotel database"))
  .catch((err) => console.error("Database connection error:", err));

// Render main pages
app.get('/', (req, res) => res.render('index'));
app.get('/registration', (req, res) => res.render('registration'));
app.get('/about', (req, res) => res.render('about'));
app.get('/data', (req, res) => res.render('data'));
// Render login page
app.get('/login', (req, res) => res.render('login'));

// Handle registration
app.post('/register', async (req, res) => {
    try {
        const { username, password, accountType } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({ username, password: hashedPassword, accountType });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password." });
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password." });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle saving parking data
app.post('/data', async (req, res) => {
    try {
        const parkingData = req.body;

        // Create and save parking record
        const newParking = new Parking(parkingData);
        await newParking.save();

        res.status(201).json({ message: "Parking data saved successfully!" });
    } catch (error) {
        console.error("Error saving parking data:", error);
        res.status(500).json({ error: "Error saving parking data" });
    }
});

// Handle retrieving parking data by ID
app.get('/data/:id', async (req, res) => {
    try {
        const parkingData = await Parking.findById(req.params.id);
        if (!parkingData) {
            return res.status(404).json({ error: 'Parking data not found' });
        }
        res.json(parkingData);
    } catch (error) {
        console.error("Error retrieving parking data:", error);
        res.status(500).json({ error: "Error retrieving parking data" });
    }
});

// 404 Error handling
app.use((req, res) => res.status(404).render('404', { message: 'Page not found' }));

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
