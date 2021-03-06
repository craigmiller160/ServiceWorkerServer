const express = require('express');
const bodyParser = require('body-parser');

const token = 'ABCDEFG';
const username = 'user';
const password = 'pass';

const app = express();
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:9080');
    res.append('Access-Control-Allow-Method', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

app.use((req, res, next) => {
    console.log('Middleware', req.url); // TODO delete this
    if (req.url === '/api/login') {
        console.log('Login url'); // TODO delete this
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log('No auth header');
        res.status(401).end();
        return;
    }

    const authToken = authHeader.replace(/^Bearer /, '');
    console.log('Auth', authHeader, authToken); // TODO delete this
    if (authToken !== token) {
        res.status(401).end();
        return;
    }

    next();
});

app.get('/api/hello', (req, res) => {
    res.send(`Hello World: ${req.headers.authorization}`);
});

app.get('/api/image', (req, res) => {
    console.log(`AuthHeader: ${req.headers.authorization}`);
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile('/assets/images/image1.jpg', { root: __dirname });
});

app.post('/api/login', jsonParser, (req, res) => {
    console.log('Login API', req.body); // TODO delete this
    if (username === req.body.username && password === req.body.password) {
        res.json({ token });
        return;
    }

    res.status(401).end();
});

app.listen(3000, () => console.log('Listening on port 3000'));
