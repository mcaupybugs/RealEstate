var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    State: String,
    HouseNo: String,
    City: String,
    Price: Number,
    userId: String,
    ImageUrl:String,
    OwnedBy:String,
    AvailableTill:Date,
    Users_Cart:[{
            type:String
        }
    ]
});

var Property = mongoose.model("Property", propertySchema)

module.exports = Property;