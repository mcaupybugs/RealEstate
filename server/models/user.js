var mongoose = require('mongoose');
var propertySchema = new mongoose.Schema({
    State: String,
    HouseNo: String,
    City: String,
    Price: Number,
    userId: String,
    ImageUrl:String
});
var userSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    userId: String
    
});

var User = mongoose.model("User", userSchema)

module.exports = User;