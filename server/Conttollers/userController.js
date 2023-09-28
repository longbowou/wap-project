const userModel = require("../Model/users");
const moment = require('moment'); // require

let usersList = [{id: 1, username: 'test1', password: 'pwd'}, {id: 2, username: 'test2', password: 'pwd'}];
let generatedString = {};

const checkJwt = (jwt) => {
    return generatedString[jwt] === undefined;
}

exports.checkJwt = checkJwt;

exports.login = (req, res, next) => {
    console.log("req: ", req.body)
    let user = usersList.find(user => {

        if ((user.id == req.body.username && user.password == req.body.password) || (user.username == req.body.username && user.password == req.body.password)) {
            return true;
        }
    })

    if (user) {
        const newUser = {...user}
        const datetime = moment().format();
        delete newUser.password;

        newUser.dateTime = datetime;
        newUser.jwt = jwt();
        generatedString[newUser.jwt] = user
        res.status(200).json(newUser);

    } else {
        res.status(401).json({message: "Invalid user credential!"});
    }

}


const jwt = function () {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r
}


