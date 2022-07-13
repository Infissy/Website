'use strict';
const express =require('express'),
    app = express(),



   
    passport = require("./passport.config"),


    path = require('path'),
    envConf = require("./environment.config.js");

//Set generic Routes


app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.use(express.static(envConf.clientPath));

app.use("/log " , (req,res) =>{

    res.send()
})


app.use('/admin',require("../routes/endpoint/report.route"));
app.use("/auth",require("../routes/auth/user.route"));    

app.use("/",require("../routes/static.route"));

app.use('/dashboard',require('../routes/endpoint/dashboard.route'));
app.use('/dashboard/user',require('../routes/endpoint/friend.route'));




app.use('/game',require("../routes/endpoint/game.route"));
module.exports = app;
