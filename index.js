const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3002;
const Game = require('./model/games/Game');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtSecret = 'asfafbhuy1k34208@4&';

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', async (req, res)=>{
    const games = await Game.findAll();
    res.status(200).json(games);
});

app.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const game = await Game.findOne({
        where:{
            id:id
        }
    });
    res.status(200).json(game);
});

app.post('/', async (req, res)=>{
    const {title, price, sinopses, genres, release} = req.body;
    await Game.create({
        title,
        price,
        sinopses,
        genres,
        release
    });
    res.status(201).send(`${title} criado com sucesso!`);
});

app.put('/:id', async (req, res)=>{
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

app.delete('/:id', async (req, res)=>{
    const id = req.params.id;

    await Game.destroy({
        where:{
            id:id
        }
    });
    res.status(204).send("Jogo deletado com sucesso");
});

app.post('/auth', (req, res)=>{
    const {email, password} = req.body;
    jwt.sign({id,email}, jwtSecret, {expiresIn:'24h'}, (err, token)=>{
        if(err){
            res.status(400).json({err:"Erro, tente novamente"});
        } else {
            res.status(200).json({token:"Tudo certo"});
        }
    });
});


app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})