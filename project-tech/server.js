const express = require('express'),
    path = require('path'),
    app = express(),
    port = 3000;

    // const database ={

    // }

//Middelware (moet gebeuren voordat op je rout komt)
app.use(express.static("assets"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
    // res.render('index', database )
});



// call back functie
app.listen(port, () => {
    console.log(`code wordt gerund in ${port}`)
});