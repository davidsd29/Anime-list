//Database
require('dotenv').config()

const {MongoClient} = require('mongodb');


// async function main() {
//     const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' +
//     process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority';

//     const client = new MongoClient(uri);

//     // verbinding maken met db
//     try {
//         await client.connect();
//         // await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally{
//         console.log("dicht")
//         await client.close(); //om zeker te zijn dat je het sluit
//     }
// }

// main().catch(console.error);

// async function listDatabases(client){
//     const databaseList = await client.db().admin().listDatabases();

//     console.log("Databases:")
//     databaseList.databases.forEach(db => {
//         console.log(`- ${db.name}`)
        
//     });
// }


// client.connect(err => {
//   const collection = client.db(`${process.env.DB_NAME}`).collection("animes");


//   // perform actions on the collection object
//      ;
// console.log(collection.find())


//   client.close();
// });


//connection
const express = require('express'),
    path = require('path'),
    app = express()

// database info
const animes = require('./database/anime'),
    users = require('./database/users'),
    genres = require('./database/genres')

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, "assets")));
// app.use(express.json);
app.use(express.urlencoded({
    extended: true
}));
// app.use((req, res) =>{
//     res.status(404).render('404');
// })

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
app.delete('/delete?id:id', (req, res) => {

})


// call back functie
app.listen(process.env.PORT, () => {
    console.log(`code is running in port:${process.env.PORT}`)
});