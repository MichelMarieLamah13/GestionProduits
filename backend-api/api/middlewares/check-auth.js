const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = (req, res, next) =>{
    const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:'';
    jwt.verify(token, process.env.PRIVATE_KEY,(error, decoded)=>{
        if(error){
            res.status(401).json({
                message: 'Authentification failed'
            });
        }else{
            next();
        }
        
    })
}