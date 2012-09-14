/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var fs = require('fs'),
    express = require('express'),
    app = express.createServer(express.logger()),
    io = require('socket.io').listen(app);
    
var port = process.env.PORT || 5000;

var recentConnection = false;

app.listen(port, function() {
    console.log("Listening on " + port);
});
    
io.configure(function () {
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    console.log(req);
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/iphone', function(req, res) {
    res.sendfile(__dirname + '/public/iphone.html');
});

io.sockets.on('connection', function(socket) {
    
    socket.emit('hi', { connection: 'established' });
    
    socket.on('hi back', function(data) {
        
        if(data.connection == "iphone") {
            // notify desktop of a connection
            socket.broadcast.emit('new user', data);
        }
        
    });
    
    socket.on('gyro', function(data) {
//        console.log(data);
        
    });
    
    socket.on('accel', function(data) {
        console.log(data);
        if(recentConnection) {
            // do nothing here
        } else {
            socket.broadcast.emit('accel', data);
            recentConnection = true;
            setTimeout(function() {
                recentConnection = false;
            }, 1000);
        }
//        socket.broadcast.emit('accel', data);
        
    });
    
});

