import express from 'express'
import index from './routes/index.js'

let port = process.env.PORT || 3001
const app = express();

app.set('view engine', 'pug');
app.use('/', index);

app.listen(port, ()=>{
    console.log('Listening on ' + port);
});