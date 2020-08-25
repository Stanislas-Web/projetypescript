import express from 'express';

const PORT : number = 8000;

const app : any = express();

app.listen(()=>{
    console.log(`le serveur ecoute sur le porter ${PORT}`);
});


