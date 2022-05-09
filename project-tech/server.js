const express = require('express'),
    animes = require('./database/anime'),
    users = require('./database/users'),
    path = require('path'),
    app = express(),
    port = 3000

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, "assets")));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        animes: animes
    })
    // res.render('index', database )
}).get('/anime/:id/:slug', (req, res) => {
    const anime = animes.find(element => element.id == req.params.id);
    res.render('single', {
        animes: anime
    });
}).get('/my-list', (req, res) => {
    res.render('mylist', {
        animes: animes
    })
}).get('/categorie/:categories', (req, res) => {
    res.render('categories', {
        animes: animes
    })

});




// call back functie
app.listen(port, () => {
    console.log(`code wordt gerund in ${port}`)
});