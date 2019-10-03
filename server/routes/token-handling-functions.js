const jwt = require('jsonwebtoken');


//Function to create token on login
let createToken = async (user) => {

    let tokenToReturn;

    await jwt.sign({
        user
    }, `${user._id}`, (err, token) => {
        return tokenToReturn = token;
    })

    return tokenToReturn;
}


//MIDDLEWARE function to retrieve token from request headers
function retrieveToken(req, res, next) {
    //Get user ID which will be used as secret key for verification
    let userID = req.body.user_id;

    //Get authorization header value
    let bearerHeader = req.headers["authorization"];
    // Check if bearerHeader is undefned
    if (typeof bearerHeader !== undefined) {
        //Get the token out of the bearer.
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        //Set the token 
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({
            status: 403,
            error: "No token found."
        })
    }


}

function verifyToken(){

}



module.exports = {
    createToken,
    retrieveToken,
    verifyToken
}