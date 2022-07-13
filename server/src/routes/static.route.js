'use strict';

const router = require("express").Router(),
path = require('path'),
envConf = require('../config/environment.config');


router.route('/register').get((req,res) =>{
    res.sendFile(path.join(envConf.pagePath +'/register.html'));
  
  
  });
  
router.route('/login').get((req,res) =>{
    res.sendFile(path.join(envConf.pagePath +'/login.html'));
  
  
  });

router.route('/dashboard').get((req,res) =>{
    res.sendFile(path.join(envConf.pagePath +'/dashboard.html'));
});

  module.exports = router;