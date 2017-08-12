const User = require('./../models/user.js');

// Get Users
exports.get = (req, res, next) => {
    User.find({}, (err, users) => {
        return res.json(users);
    });
};

// Create User
exports.create = (req, res, next) => {
    delete req.body._id;
    User.create(req.body, (err, user) => {
        return res.json(err ? err : user);
    })
};

// Destroy User
exports.destroy = (req, res, next) => {
    User.deleteOne({_id: req.params.id}, (err, rawData) => {
        return res.json(err ? err : true)
    });
};

// Edit User
exports.edit = (req, res, next) => {
    User.update({_id: req.params.id}, req.body, (err, rawData) => {
        return res.json(err ? err : true)
    });
};