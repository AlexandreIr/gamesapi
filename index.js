const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');

const port = 3002;
const Game = require('./model/games/Game');
const User = require('./model/users/User');

const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const jwtSecret = 'asfafbhuy1k34208@4&';

function authToken(req, res, next){
    const jwtoken = req.headers['authorization'];
    console.log(jwtoken)
    if(jwtoken!=null){
        const bearer = jwtoken.split(' ');
        const token = bearer[1];
    
        jwt.verify(token, jwtSecret, (err, data)=>{
            if(err){
                res.status(401).json({err:"Token invalido"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email:data.email};
                console.log(req.loggedUser);
                next();
            }
        });
    } else {
        res.status(401).json({err:'Erro, token invalido'});
    }
}

app.get('/', authToken, async (req, res)=>{
    const games = await Game.findAll();
    res.status(200).json({user:req.loggedUser,games});
});

app.get('/:id', authToken, async(req, res)=>{
    const id = req.params.id;
    const game = await Game.findOne({
        where:{
            id:id
        }
    });
    res.status(200).json(game);
});

app.post('/',authToken ,async (req, res)=>{
    const {title, price, sinopses, genres, release} = req.body;
    try{
        await Game.create({
            title,
            price,
            sinopses,
            genres,
            release
        });
        res.status(201).send(`${title} criado com sucesso!`);
    } catch (err){
        res.status(401).json({err});
    }
});

app.put('/:id', authToken ,async (req, res)=>{
    const id = req.params.id;
    const {title, price, sinopses, genres, release} = req.body;

    await Game.update({
        title, 
        price, 
        sinopses, 
        genres, 
        release
    }, {
        where:{
            id:id
        }
    });
    res.status(202).send(`jogo de número ${id} atualizado com sucesso!`);
});

app.delete('/:id',authToken ,async (req, res)=>{
    const id = req.params.id;

    await Game.destroy({
        where:{
            id:id
        }
    });
    res.status(204).send("Jogo deletado com sucesso");
});

app.post('/user', async(req, res)=>{
    const {name, email, password} = req.body;
    const userFound = await User.findOne({
        where:{
            email:email
        }
    });
    if(userFound==null){
        const salt = bcrypt.genSaltSync(11);
        const hash = bcrypt.hashSync(password, salt);
        User.create({
            name,
            email,
            password:hash
        });
        res.status(201);
    }
    res.json({userExists: "Usuário já cadastrado"});
});

app.get('/user/:id', async(req, res)=>{
    const id = req.params.id;
    const userInfo = await User.findOne({where:{id:id}});
    res.status(200).json(userInfo);
});

app.post('/auth', async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({where:{email:email}});
    if(user!=null){
        const verification = bcrypt.compareSync(password, user.password);
        if(verification){
            jwt.sign({id:user.id,email:user.email}, jwtSecret, {expiresIn:'24h'}, (err, token)=>{
                if(err){
                    res.status(400).json({err:"Erro, tente novamente"});
                }
                res.status(200).json({token});
            });
        }
    }
});


app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})