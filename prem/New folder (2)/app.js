// server.js or app.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to handle POST requests
app.post('/submit-teacher-feedback', (req, res) => {
    // Your logic to handle feedback submission
    console.log(req.body);
    res.status(200).send('Feedback submitted successfully');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
