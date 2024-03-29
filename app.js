const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();

// Define route for /users
app.get('/users', (req, res) => {
    res.send('Users route');
});

// Define route for /comments
app.get('/comments', (req, res) => {
    res.send('Comments route');
});

// Define route for /posts
app.get('/posts', (req, res) => {
    res.send('Posts route');
});

// Define route with parameter capturing all subsequent paths
app.get('/:category', (req, res) => {
    const category = req.params.category;
    res.send(`${category} route`);
});


// Custom Middleware - Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next to move to the next middleware in the chain
};

// Custom Middleware - Authentication Middleware (Example - Simulated)
const isAuthenticated = (req, res, next) => {
    // Simulated check if user is authenticated
    const isAuthenticated = checkIfUserIsAuthenticated(req);
    if (isAuthenticated) {
        next(); // User is authenticated, proceed to next middleware or route handler
    } else {
        res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated, send 401 Unauthorized response
    }
};

// Example of a function to check if user is authenticated (simulated)
const checkIfUserIsAuthenticated = (req) => {
    // Simulated logic to check if user is authenticated
    // For example, you might check for a session, token, or user credentials in the request
    // Here, we'll just simulate that the user is authenticated if the request contains a specific header
    return req.headers.authorization === 'Bearer token123';
};

// Use the custom middleware in your Express app
app.use(loggerMiddleware);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Use authentication middleware for specific routes
app.get('/authenticated-route', isAuthenticated, (req, res) => {
    res.json({ message: 'Authenticated route accessed successfully' });
});

// Custom Middleware - Error Handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

// Example of a route that throws an error
app.get('/error', (req, res, next) => {
    // Simulated error for demonstration
    const error = new Error('This is a simulated error');
    next(error); // Pass the error to the next middleware
});

// Use the error-handling middleware
app.use(errorHandler);

// Set 'views' directory for any views being rendered
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to render the index view
app.get('/', (req, res) => {
    // Sample data
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Christine Brook' },
        { id: 4, name: 'Graham  Moris' },
        { id: 5, name: 'Cozy  Balard' },
        { id: 6, name: 'Keith Hunting' },
        { id: 7, name: 'Jacky Maher' },
        { id: 8, name: 'Jonny Boe' },
    ];

    // Render the 'index' view and pass the 'users' data to it
    res.render('index', { users });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
