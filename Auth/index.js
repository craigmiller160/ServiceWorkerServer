const express = require('express');

const token = 'ABCDEFG';

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:9080');
    res.append('Access-Control-Allow-Method', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).end();
        return;
    }

    const authToken = authHeader.replace(/^Bearer /, '');
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

app.listen(3000, () => console.log('Listening on port 3000'));
