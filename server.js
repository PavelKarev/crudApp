// Express
let express = require('express');
let app = express();
const path = require('path');

// Static Folder
app.use(express.static(__dirname + '/public/dist'));

// Body Parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Morgan (debugger)
let morgan = require('morgan');
app.use(morgan('dev'));

// Mongo Database
let mongoose = require('mongoose');
mongoose.connect('');
let UserSchema =  new mongoose.Schema({
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true},
    editable: {type: Boolean, require: true},
});
mongoose.model("User", UserSchema);
let User = mongoose.model("User");


// Routes
// Get Users
app.get('/users', (req, res, next) => {
    console.log("Server > GET '/users/'");
    User.find({}, (err, users) => {
        return res.json(users);
    });
});
// Create User
app.post('/users', (req, res, next) => {
    console.log("Server > POST '/users/' > user", req.body);
    delete req.body._id;
    User.create(req.body, (err, user) => {
        let text = null;

        if (err) {
            text = err;
        } else {
            text = user;
        }
        return res.json(text)
    })
})
// Destroy User
app.delete('/users/:id', (req, res, next) => {
    console.log("Server > DELETE '/users/:id' > id", req.params.id);
    User.deleteOne({_id: req.params.id}, (err, rawData) => {
        let text = null;

        if (err) {
            text = err;
        } else {
            text = true;
        }
        return res.json(text)
    })
})
// Edit User
app.put('/users/:id', (req, res, next) => {
    console.log("Server > PUT '/users/:id' > id", req.params.id);
    console.log("Server > PUT '/users/:id' > user", req.body);
    User.update({_id: req.params.id}, req.body, (err, rawData) => {
        let text = null;

        if (err) {
            text = err;
        } else {
            text = true;
        }
        return res.json(text)
    });
})



app.all("*", (req, res, next) => {
    res.sendfile(path.resolve("./public/dist/index.html"));
});

// Server listening
app.listen(3000, () => console.log('Server running at 3000'));