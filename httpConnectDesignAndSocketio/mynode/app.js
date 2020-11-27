const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    cors = require('cors'),
    io = require('socket.io')(server);

server.listen(3001);
app.use(cors());

io.on('connection',socket => console.log("connect"));
app.get('/', function(req, res){ 
    res.send("hi"); 
}); 
app.get('/data/all', (req,res) => res.json({
    client: req.headers["user-agent"],
    title : 'MyNodeJsServer',
    data : 'MyNodeJsServerData'
}));
