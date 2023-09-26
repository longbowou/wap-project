const userModel = require("../Model/users");
const moment = require('moment'); // require

let usersList = [{id: 1, username: 'test1', password: 'pwd'}, {id: 2, username: 'test2', password: 'pwd'}];

exports.login = (req, res, next) => {
    const user = usersList.find(user => {
        if((user.id == req.body.id && user.password == req.body.password) || (user.username == req.body.id && user.password == req.body.password)){
            return user;
        }
    })
    if (user){
        const datetime = moment().format();
        user.dateTime = datetime;
        res.status(200).json(user);

    }
    else {
        res.status(401).json({ message: "Invalid user credential!"});
    }

}


