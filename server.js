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
    /*file upload*/
    const multer = require('multer');
    const DIR = './uploads';
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, DIR);
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
      }
    });
    let upload = multer({storage: storage});

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    app.get('/fu', function (req, res) {
      res.end('file upload');
    });

    app.post('/fu/upload',upload.single('dosya'), function (req, res) {
      if (!req.file) {
        console.log("Your request doesn’t have any file");
        return res.send({
          success: false
        });

      } else {
        console.log('Your file has been received successfully');
        return res.send({
          success: true
        })
      }
    });
    /**/
    const port = process.env.PORT || 5000;

    app.use('/adunits', adUnitRoutes);
    const server = app.listen(port, function(){
    const host = server.address().address;
    console.log('Listening on port '  +port);
  });
