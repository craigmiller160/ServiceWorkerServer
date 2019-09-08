const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:9080');
    res.append('Access-Control-Allow-Method', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

const getAuthHeader = (headers) =>
    Object.entries(headers)
        .filter(([key]) => 'authorization' === key.toLowerCase())
        .map(([key, value]) => `${key}=${value}`);

app.get('/hello', (req, res) => {
    const authHeader = getAuthHeader(req.headers);
    res.send(`Hello World: ${authHeader}`);
});

app.get('/image', (req, res) => {
    const authHeader = getAuthHeader(req.headers);
    console.log(`AuthHeader: ${authHeader}`);
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile('/assets/images/image1.jpg', { root: __dirname });
});

app.listen(3000, () => console.log('Listening on port 3000'));
