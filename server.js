    const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')
    setCookie = require('set-cookie');
    cors = require('cors'),
    mongoose = require('mysql'),
    config = require('./config/DB');


    const adUnitRoutes = require('./routes/adunit.route');
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use(cookieParser());

    const port = process.env.PORT || 4000;
//    console.log('adsjkhaskdhasjkdhask');
    // app.get('/', (req, res) => res.redirect('http://127.0.0.1:4100/welcome'));
    app.use('/adunits', adUnitRoutes);
    const server = app.listen(port, function(){
    const host = server.address().address;
    console.log('Listening on port '  +port);
  });
