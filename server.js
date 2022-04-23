require("dotenv").config();
const ioSessions =  require('express-socket.io-session')
const express = require("express")
const rashed = express();
const server = require("http").createServer(rashed);
const io = require("socket.io")(server,{cors:{origin:"*"}});
const port = process.env.PORT || 8009;
const path = require("path");

const db = require('./database/db')
const session = require('./config/session')

rashed.set('view engine', 'ejs')
rashed.set('views', path.join(__dirname, '/views'))

rashed.use(express.static('public'))
rashed.use(session)
io.use(ioSessions(session))

rashed.get("/",(req,res)=> {
    res.render('index', {
        fromServer: 'server is connected to html page'
    })
})

rashed.get("/ww",(req,res)=> {
    res.redirect('/')
})

server.listen(port,()=>{
    console.log(`rashed is on in port ${port}`);
})

io.on("connection", (socket)=>{
    console.log(socket.handshake.session? 'session socket connected' : 'err in session socket')
    console.log(`new socket id connected with id => ${socket.id}`);
})


