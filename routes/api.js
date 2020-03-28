const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser')
setCookie = require('set-cookie');
cors = require('cors'),
    mongoose = require('mysql'),

http = require('http');
PORT=3000;
const adUnitRoutes = require('./routes/adunit.route');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(cookieParser());
//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use(express.static(__dirname + "/views"));
const api = require("./routes/api");
app.use("/api", api);

app.use(function(req, res) {
//res.send(‘404: Page not Found’, 404);
    res.status(404).send({status:404, message: "404 Not Found", type:"client"});
});
// Handle 500
app.use(function(error, req, res, next) {
    res.status(500).send({status:500, message: "internal error’, type:’internal"});
});
//listen
var httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`API running on localhost:${PORT}`));

router.get("/user",(req,res)=>{
    res.json({"msg":"Hi method GET called"});
});
router.post("/setuser",(req,res)=>{
    params = {
        data:req.body,
        headers:req.headers,
        msg:"Hi method POST called"
    };
    res.json(params);
});
module.exports = router;
