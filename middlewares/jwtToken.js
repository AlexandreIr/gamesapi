const jwt = require('jsonwebtoken');

const jwtSecret = 'asfafbhuy1k34208@4&';

function jwtToken(res, req, next){
    const jwtToken = req.headers['authorization'];
    if(jwtToken==null){
        res.status(401).json({err:'Erro, token invalido'});
    }
    const bearer = jwtToken.split(' ');
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (err, data)=>{
        if(err){
            res.status(401).json({err:"Token invalido"});
        }
        req.token = token;
        req.loggedUser = {id: data.id, email:data.email};
        console.log(data);
        next();
    });
    console.log(bearer);
}

module.exports = jwtToken;