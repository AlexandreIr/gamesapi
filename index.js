const express = require('express');
const app = express();
const port = 3002;


app.get('/', (req, res)=>{
    res.sendStatus(200).send('Olá mundo');
})



app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})