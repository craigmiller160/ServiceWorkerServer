const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:9080');
    res.append('Access-Control-Allow-Method', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/hello', (req, res) => {
    const headers = Object.entries(req.headers)
        .filter(([key]) => 'authorization' === key.toLowerCase())
        .map(([key, value]) => `${key}=${value}`);
    res.send(`Hello World: ${headers}`);
});

app.listen(3000, () => console.log('Listening on port 3000'));
