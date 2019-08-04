const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = module.exports.io = require('socket.io')(http);
const socketEventsHandler = require('./socket-events-handler');

app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

io.on('connection', socketEventsHandler);

http.listen(port, () => {
  console.log('App is listening on port ' + port);
});
