const express = require('express');

const app = express.Router();

app.post('/', user.deleteOne);

[
  {
    '$search': {
      'index': 'searchAnime',
      'text': {
        'query': '{"genre": {$eq: "fighting"}}',
        'path': {
          'wildcard': '*'
        }
      }
    }
  }
]