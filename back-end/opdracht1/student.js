const student = require('./person'),
    express = require('express');

const app = express(),
 port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log(`my name is ${student.name} and i am ${student.age} years old`);
