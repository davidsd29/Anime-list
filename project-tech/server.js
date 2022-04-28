const express = require('express');

const app = express(),
 port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(express.static("assets"));

// call back functie
app.listen(port, () => {
  console.log(`code wordt gerund in ${port}`)
});