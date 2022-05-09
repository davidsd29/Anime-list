//connection
const express = require('express'),
    path = require('path'),
    app = express(),
    port = 3000

// let url = require('url');

// database info
const animes = require('./database/anime'),
    users = require('./database/users')

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, "assets")));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        animes: animes
    })
    // res.render('index', database )
})
.get('/anime/:id/:slug', (req, res) => {
    const anime = animes.find(element => element.id == req.params.id);
    res.render('single', {
        animes: anime
    });
})
.get('/my-list', (req, res) => {
    res.render('mylist', {
        animes: animes
    })
})
.get('/categorie/:categories', (req, res) => {
      const anime = animes.find(element => element.id == req.params.id);
    res.render('categories', {
        anime: anime
    })
})
.get('/register', (req, res) => {
    res.render('register')
})
.get('/profile', (req, res) => {
    res.render('profile', {
        animes: animes,
        user:users
    })
});



// app.get('/delete', (req, res) => {
//     let q = url.parse(req.url, true).query;

//     if(q.id == animes.id){
//         change value animes.like
//         anime.like = "";
//     }
//     //http redirect terug naar mylist 
// })


// call back functie
app.listen(port, () => {
    console.log(`code wordt gerund in ${port}`)
});