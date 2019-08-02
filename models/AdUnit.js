const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('adUnit.jse girdi' )
// Define collection and schema for AdUnits
let AdUnit = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  id_user: {
    type: Number
  }
},{
    collection: 'adunits'
});

module.exports = mongoose.model('AdUnit', AdUnit);
