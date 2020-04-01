const express = require('express');
const app = express();
const adUnitRoutes = express.Router();
const params=String;
/*file upload function*/
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
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



/**/

      const mongoose = require('../config/DB.js');

      let con = mongoose.getConnection();






// Require AdUnit model in our routes module
let AdUnit = require('../models/AdUnit');

adUnitRoutes.route('/cookie').get(function (req, res) {
  console.log('/cookie get cookieye girdik');
  res.status(200);

// console.log('Cookies: ', req.cookies);
});

adUnitRoutes.route('/setcookie').post(function (req, res) {
  console.log('/setcookie içindeyiz');
     let username = req.body.username;
     console.log(username);
     res.cookie("adisoyadi", username);


   // res.cookie('uuid', '1', { signed: false, httpOnly: false });//signed için secret gerekiyor
   //   res.cookie('username',username, { maxAge: 120*60000, httpOnly: false });
   //   res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
   //   res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: false });
     // console.log('Cookies: ', req.cookies);

});
// app.get('/clearcookie',function(req, res){
//   clearCookie(req.body.username);
//     console.log('/cookie silindi');
//   res.send('Cookie deleted');
// });

// Defined store route

adUnitRoutes.route('/add').post(function (req, res) {
  let password = req.body.password;
  let username = req.body.username;
  let id_user = req.body.id_user;

  console.log('add fonksiyonu çalıtııııııı');
// res.status(200).json({'adUnit': 'AdUnit in added successfully'});
console.log('BURAYA ADD YAPACAK KOD YAZILACAK'+req.body.username);
  let adUnit = new AdUnit(req.body);
  con.query(
    "INSERT INTO  users  (username,email,id_user) VALUES ('"+req.body.username+"','"+req.body.email+"','"+req.body.id_user+"');",function (err, resultDEL) {
        if (err){
            console.log(err);
        }
        res.status(200).json(resultDEL)});
console.log('BURAYA'+req.body.username);
  // adUnit.save()
  //   .then(game => {
  //     res.status(200).json({'adUnit': 'AdUnit in added successfully'});
  //   })
  //   .catch(err => {
  //   res.status(400).send("unable to save to database");
  //   });
});
// Login system
adUnitRoutes.route('/login').post(function (req, res) {
let adUnit = new AdUnit(req.body);
// res.status(200).json({'adUnit': 'AdUnit in added successfully'});
let password = req.body.password;
let username = req.body.username;
    console.log('login fonksiyonu çalıtııııııı' + username+password);
    // var query="SELECT username,password FROM users where id_user='"+username+"' and password='"+password+"';";
    let query="SELECT username,password FROM users where username='"+username+"' and  password='"+password+"';";
    console.log(query);

  con.query(query, function (err, result) {
      if(err){
          console.log(err);
      }
console.log('JSte sqlden gelen kayıt boyu'+result.length);
if (result.length==1) {

  console.log('JSteki gelen username:'+result[0].username);
 // res.redirect('http://localhost:4100/logined-in');
} else {
  console.log('kayıt bulamadı redirect ediyor');
result=1;
  //res.render('http://localhost:4200/login');
}
console.log(result);
    res.status(200).json(result);
    console.log('JSteki gelen kayıt boyu:'+result.length);

 console.log('gelen json='+JSON.stringify(result));
  });

    // res.json(adUnit);
});

// Defined get data(index or listing) route
adUnitRoutes.route('/').get(function (req, res) {
  console.log('/ fonksiyonu çalışşşşşştııııııı');


    AdUnit.find(function (err, adUnits){

    if(err){
      console.log(err);
    }
    else {
        console.log(adUnits);

      res.json(adUnits);
    }
  });
});
adUnitRoutes.route('/index').get(function (req, res) {
  console.log('/index fonksiyonu çalıştııııııı');
  con.query("SELECT username,email,id_user FROM users;", function (err, resultDEL) {
      if(err){
          console.log(err);
      }
      res.status(200).json(resultDEL)});
    console.log('getirrrrrrrriyor');

  //   AdUnit.find(function (err, adUnits){
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.json(adUnits);
  //   }
  // });
});
adUnitRoutes.route('http://localhost:8090/json/posts/all/:writer/:api').get(function (req, res1) {

    let writer = req.params.writer;
    let api = req.params.api;
    res1.status(200);
console.log('içine girdiiiiiiiiii res1 ' + writer+api+ res1[0]);
});
// Defined search route
adUnitRoutes.route('/search/:user').get(function (req, res) {
  let whereClouse='*all';
  let user = req.params.user;
  console.log('search fonksiyonu çalıtııııııı'+ user );
  if(user=='*all'){
    whereClouse='';
  } else {
    whereClouse="where username like '"+user+"%'";
  }
  con.query("SELECT username,email,id_user FROM users "+ whereClouse + " ;", function (err, resultDEL) {
    if(err){
      console.log(err);
    }
    console.log(resultDEL);
    res.status(200).json(resultDEL)});
  console.log('getirrrrrrrriyor');

});
// Defined edit route
adUnitRoutes.route('/edit/:id_user').get(function (req, res) {
let id_user = req.params.id_user;
  console.log('edit fonksiyonu çalıtııııııı'+ id_user);

  AdUnit.findById(id_user, function (err, adUnit){
    console.log(id_user);
    con.query("SELECT username,email,id_user FROM users where id_user='"+id_user+"';", function (err, resultDEL) {
      // console.log(JSON.stringify(resultDEL));
        if(err){
            console.log(err);
        }
      res.status(200).json(resultDEL)});
      // res.json(adUnit);
  });
});
adUnitRoutes.route('/delete/:id_user').get(function (req, res) {
  console.log('delete fonksiyonu çalıtııııııı');
    // AdUnit.findByIdAndRemove({_username: req.params.username}, function(err, adUnit){
    //     if(err) res.json(err);
    //     else res.json('Successfully removed');
    // });
    let id_user = req.params.id_user;

      AdUnit.findByIdAndRemove(id_user, function (err, adUnit){
        console.log(id_user);
        var st="DELETE FROM users where id_user='"+id_user+"';";
        console.log(st);
        con.query(st, function (err, resultDEL) {
          // console.log(JSON.stringify(resultDEL));
          res.status(200).json(resultDEL)});
          // res.json(adUnit);
      });
});

//  Defined update route

adUnitRoutes.route('/update/:id_user').post(function (req, res) {
  console.log('update fonksiyonu çalıstııııııı');

  console.log('adunitroute.jse  kadar geldi' +req.body.username+req.body.email+ req.body.id_user);
  AdUnit.findById(req.body.id_user, function (err, adUnit){
let sqlString="UPDATE  users SET username='"+req.body.username+"',email='"+req.body.email+"' WHERE id_user='"+req.body.id_user+"';";
console.log(sqlString);
    con.query(sqlString, function (err, resultDEL) {
      if(err){
          console.log(err);
      }
      res.status(200).json(resultDEL)});
      // res.json(adUnit);
  });
});
//   AdUnit.findById(req.params.id_user, function(err, adUnit) {
//   if (!adUnit)
//     return next(new Error('Could not load Document'));
//   else {
//       adUnit.username = req.body.username;
//       adUnit.email = req.body.email;
//       adUnit.id_user = req.body.id_user;
//
//       adUnit.save().then(adUnit => {
//         res.json('Update complete');
//     })
//     .catch(err => {
//           res.status(400).send("unable to update the database");
//     });
//   }
// });
// Defined delete | remove | destroy route

module.exports = adUnitRoutes;
