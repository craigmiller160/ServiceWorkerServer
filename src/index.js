const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Method', 'GET,POST');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Listening on port 3000'));
