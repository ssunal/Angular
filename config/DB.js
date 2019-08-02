const mongoose = require('mysql');
module.exports = {

    getConnection: function() {
        let con;
        if (!con){
            let con = mongoose.createConnection({
                host: "localhost",
                user: "root",
                password: "#Mu010595!",
                database: "websiteusers"
            });     console.log('girdi'); return con; };
//'mysql://localhost:27017/ngcrud'

    }
};