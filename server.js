import express from 'express'

let port = process.env.PORT || 3001
const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.render('index', {});
});

app.listen(port, ()=>{
    console.log('Listening on ' + port);
});