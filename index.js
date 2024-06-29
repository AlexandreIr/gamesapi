const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3002;
const Game = require('./model/games/Game');
const { where } = require('sequelize');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', async (req, res)=>{
    const games = await Game.findAll();
    res.json(games);
});

app.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const game = await Game.findOne({
        where:{
            id:id
        }
    });
    res.json(game);
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
    res.send(`${title} criado com sucesso!`);
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
    res.send(`jogo de número ${id} atualizado com sucesso!`);
});

app.delete('/:id', async (req, res)=>{
    const id = req.params.id;

    await Game.destroy({
        where:{
            id:id
        }
    });
    res.send("Jogo deletado com sucesso");
});


app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})