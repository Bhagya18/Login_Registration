const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(express.static('views'));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'user_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Routes
// Registration


// app.get('/', (req, res) => {
//     res.send('Welcome to the Registration and Login System!');
// });

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});


app.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        } else {
            res.send('User registered successfully');
        }
    });
});


// Login

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});


// app.use((req, res) => {
//     console.log(`Unhandled request: ${req.method} ${req.url}`);
//     res.status(404).send('Route not found');
// });

app.post('/login', (req, res) => {
    console.log('Incoming login request:', req.body); // Debugging

    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            console.log('User not found for email:', email);
            return res.status(401).send('User not found');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid credentials for email:', email);
            return res.status(401).send('Invalid credentials');
        }

        res.send(`Welcome, ${user.first_name}`);
    });
});


// Route to serve the login form
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Route to serve the register form
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

// Start Server
app.listen(3005, () => {
    console.log('Server running at http://localhost:3005');
});
