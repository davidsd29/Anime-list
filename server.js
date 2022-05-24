//Data of Database
require('dotenv').config();

//connection
const express = require('express'),
    path = require('path'),
    app = express()

// const bycrypt = require('bcrypt');

const multer = require('multer');

// database info
const users = require('./database/users'),
    genres = require('./database/genres')

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
    });


//Forms
app.get('/new-anime', (req, res) => {
        res.render('newAnime', {
            genres
        })
    })
    .get('/register', (req, res) => {
        res.render('register')
    });


// MULTER
const storageAnime = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads/animes'); // store here
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + file.originalname // giving name and original name
        );
    },
});

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads/users'); // store here
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + file.originalname // giving name and original name
        );
    },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './assets/img'); // store here
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + file.originalname // giving name and original name
//     );
//   },
// });

const uploadAnime = multer({
    //
    storage: storageAnime,
});

const uploadUser = multer({
    //
    storage: storageUser,
});


// INSERT NEW
app.post('/register', uploadAnime.single('tumbnail'), async (req, res) => {

        let user = {
            name: req.body.name,
            username: req.body.username,
            pasword: req.body.pws,
            tumbnail: req.file.filename,
            email: req.body.email,
            discription: req.body.description
        }

        await db.collection('users').insertOne({
            user
        });
    })
    .post('/new', uploadUser.single('tumbnail'), async (req, res) => {

        await db.collection('animes').insertOne({
            name: req.body.name,
            slug: req.body.name,
            tumbnail: req.file.filename,
            // tumbnail: req.file ? req.file.filename : null, // zet alles na de ? uit, dan krijg je een data object. Daar kan je meer mee.
            rating: req.body.rating,
            like: false,
            categories: [req.body.genre],
            episodes: req.body.episodes,
            storyline: req.body.storyline
        });

        res.redirect('/');
    });

// LOGIN


// UPDATE
app.post('/like', async (req, res) => {

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

        res.redirect('/my-list');
    });


// DELETE
app.post('/delete', async (req, res) => {
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