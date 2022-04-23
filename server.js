require("dotenv").config();
const express = require("express")
const rashed = express();
const server = require("http").createServer(rashed);
const io = require("socket.io")(server,{cors:{origin:"*"}});
const port = process.env.PORT || 8009;
const path = require("path");
const ejs = require('ejs')

const db = require('./database/db')
const session = require('./config/session')

rashed.set('view engine', 'ejs')
rashed.set('views', path.join(__dirname, '/views'))

rashed.use(express.static('public'))
rashed.use(session)
rashed.get("/",(req,res)=> {
    res.render('index', {
        fromServer: 'server is connected to html page'
    })
})


server.listen(port,()=>{
    console.log(`rashed is on in port ${port}`);
})

io.on("connection", (socket)=>{
    console.log(`new socket id connected with id => ${socket.id}`);
})


