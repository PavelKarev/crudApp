const mongoose = require('mongoose');

let UserSchema =  new mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true},
    editable: {type: Boolean, require: true},
});

module.exports = mongoose.model("User", UserSchema);;