// @ SETUP
// npm init
// npm i -s express
// npm i -s cors

const express = require('express'),
    app = express(),
    cors = require('cors');
app.listen(3000);
app.use(cors());

app.get('/data/all', (req,res) => res.json({
    client: req.headers["user-agent"],
    title : 'MyNodeJsServer',
    data : 'MyNodeJsServerData'
}));

