
const jwt = require("jsonwebtoken");
function Authenticate(req, res, next)
{
    console.log(req.headers);
    const {authorization} = req.headers;
    console.log(authorization); //Bearer 123412
    const acquiredToken = authorization.split(" ")[1];

    // get the second part of authorizatoin
    // return res.json({success: true, msg: "Welcome back Sir"})
//  const currentToken = localStorage.getItem(token);

    jwt.verify(acquiredToken, process.env.ACCESS_SECRET_TOKEN, (err, user)=>{
        if (err)
        {
            return res.status(401).json({success: false, msg: "Token not authenticated, Relogin to get a new token"})
        }
        console.log(user); //{ userName: 'John', iat: 1749778565 }
        next();
    })
};

module.exports = {Authenticate}