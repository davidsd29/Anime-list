//connection
const express = require('express'),
    path = require('path'),
    app = express(),
    port = 3000
    // animes = require('./db')

    // let url = require('url');

    // database info
    const animes = require('./database/anime'),
        users = require('./database/users'),
        genres = require('./database/genres')

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, "assets")));
// app.use(express.json);
app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
        console.log('sdfjl')
        res.render('index', {
            animes,
            genres
        })
        // res.render('index', database )
    })
    .get('/anime/:id/:slug', (req, res) => {
        const anime = animes.find(element => element.id == req.params.id);
        res.render('single', {
            animes: anime,
            genres
        });
    })
    .get('/my-list', (req, res) => {
        res.render('mylist', {
            animes,
            genres
        })
    })
    .get('/genres/:genre', (req, res) => {
        const anime = animes.find(element => element.id == req.params.id);
        res.render('genres', {
            anime: anime,
            genres
        })
    })

    .get('/profile', (req, res) => {
        res.render('profile', {
            animes,
            users
        })
    })
    //Forms
    .get('/new-anime', (req, res) => {
        res.render('newAnime', {
            genres
        })
    })
    .get('/register', (req, res) => {
        res.render('register')
    });

// Form POST
app.post('/register', (req, res) => {

        users.push({
            id: id,
            name: req.body.name,
            username: req.body.username,
            pasword: req.body.psw,
            tumbnail: req.body.profile_photo,
            email: req.body.email,
            discription: req.body.description
        })
        res.render('index', {
            animes,
            genres
        })

    })
    .post('/new', (req, res) => {
        const id = req.params.id

        animes.push({
            id: id,
            name: req.body.name,
            slug: req.body.name,
            tumbnail: req.body.tumbnail,
            rating: req.body.rating,
            categories: req.body.categories,
            episodes: req.body.episodes,
            storyline: req.body.storyline,
        })

        res.render('index', {
            animes,
            genres
        });
    })
    .post('/like', (req, res) => {
        console.log(req.body)
        const id = req.params.id

        animes.push({
            id: id,
            like: req.body.like
        })

        res.render('mylist', {
            animes,
            genres
        });
    });


// DELETE

app.get('/delete?id:id', (req, res) => {

})


// call back functie
app.listen(port, () => {
    console.log(`code is running in port:${port}`)
});