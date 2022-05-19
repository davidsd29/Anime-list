//Data of Database
require('dotenv').config();

//connection
const express = require('express'),
    path = require('path'),
    app = express()


const passport = require('passport'),
    flash = require('express-flash'),
    session = require('express-session')
    // bycrypt = require('bcrypt');

    const initalizePassport = require('./passport-config')
initalizePassport(
    passport,
    username => users.find(user => user.username === username));

// database info
const users = require('./database/users'),
    genres = require('./database/genres')

// let validRegister = require('./assets/js/register-valid');
// console.log(validRegister)
const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
} = require('mongodb');


let db = null;

async function connectDB() {

    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' +
        process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority';

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });

    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);

    } catch (error) {
        throw error;
    }
}

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({
    extended: true
}));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET, //gehieme wachtwoord
    resave: false, // dont save if nothing changes
    saveUninitialized: false // dont save an empty value in a session
}));
app.


app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
        // GET LIST OF ANIMES
        const animes = await db.collection('animes').find({}, {}).toArray();
        res.render('index', {
            animes,
            genres
        })
    })
    .get('/anime/:id/:slug', async (req, res) => {
        const anime = await db.collection('animes').find({
            _id: ObjectId(req.params.id)
        }).toArray();

        res.render('single', {
            anime,
            genres
        });
    })
    .get('/my-list', async (req, res) => {
        const animes = await db.collection('animes').find({
            like: true
        }).toArray();
        res.render('mylist', {
            animes,
            genres
        })
    })
    .get('/genre', async (req, res) => {
        let genre = await db.collection('animes').find({
            genre: req.query.genre
        }).toArray();

        res.render('genres', {
            genres,
            genre
        })
    })

    .get('/profile', async (req, res) => {
        const animes = await db.collection('animes').find({}, {}).toArray();
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
    })
    .get('/login', (req, res) => {
        res.render('register')
    });



// Form POST
app.post('/register', async (req, res) => {

        let user = {
            name: req.body.name,
            username: req.body.username,
            pasword: req.body.pws,
            tumbnail: req.body.profile_photo,
            email: req.body.email,
            discription: req.body.description
        }

        await db.collection('users').insertOne({
            user
        });

        // res.redirect('/');
    })
    .post('/new', async (req, res) => {

        await db.collection('animes').insertOne({
            name: req.body.name,
            slug: req.body.name,
            tumbnail: req.body.tumbnail,
            rating: req.body.rating,
            like: false,
            categories: [req.body.genre],
            episodes: req.body.episodes,
            storyline: req.body.storyline,
        });

        // animes.push({
        //     id: id,
        //     name: req.body.name,
        //     slug: req.body.name,
        //     tumbnail: req.body.tumbnail,
        //     rating: req.body.rating,
        //     like: false,
        //     categories: req.body.categories,
        //     episodes: req.body.episodes,
        //     storyline: req.body.storyline,
        // })
        res.redirect('/');
    })

    // UPDATE
    .post('/like', async (req, res) => {
        await db.collection("animes").updateOne({
            _id: ObjectId(req.body.like)
        }, {
            $set: {
                like: true
            }
        })

        res.redirect('/my-list');
    })
    .post('/remove-fav', async (req, res) => {
        await db.collection("animes").updateOne({
            _id: ObjectId(req.body.remove)
        }, {
            $set: {
                like: false
            }
        })

        const animes = await db.collection('animes').find({
            like: true
        }).toArray();

        res.redirect('/my-list');

    })


    // DELETE
    .post('/delete', async (req, res) => {
        // console.log(req.body.delete)
        await db.collection("animes").deleteOne({
            _id: ObjectId(req.body.delete)
        })

        res.redirect('/');
    });

app.use((req, res) => {
    res.status(404).render('404');
});

// call back functie
app.listen(process.env.PORT, () => {
    console.log(`code is running in port:${process.env.PORT}`);
    connectDB().then(console.log("We have a mongoDB Connection"))
});