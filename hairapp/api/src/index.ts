import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import 'module-alias/register'
import { router } from '@routes/index';
import * as path from 'path';
// *developpement mode
const PORT = 8000;

// *production mode
// const PORT = 80; 

const app = express();
const app2 = express();
// body middleware bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'), {}))
// cors middleware
app.use(cors()); 

// Authorization middleware

// app.use(function (req, res, next) { 
//     if (req.headers['authorization'] == "dbgeneratetoken") {
//         next();
//     }
//     else {
//         res.status(401);
//         res.json({error: 'unautorized'});
//     }
// });

// routing middleware

app.use('/api',  router); 
app2.use(express.static(path.join(__dirname,'public')));
app2.get('**', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});
app.listen(process.env.PORT || PORT,()=>{});
app2.listen(7000,()=>{});