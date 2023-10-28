const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {
  
  if (req.query.person) {
    const quotesByPerson = quotes.filter(quote => quote.person === req.query.person)
    res.status(200).send({ quotes: quotesByPerson })
  } else {
    res.status(200).send({ quotes })
  }
})

app.post('/api/quotes', (req, res, next) => {
  const { person, quote } = req.query;
  if (person && quote) {
    const newQuote = { person, quote }
    quotes.push(newQuote)
    res.status(201).send({ quote: newQuote })
  } else {
    res.status(400).send("Error: person or quote missing")
  }
})

app.get('/api/quotes/random', (req, res, next) => {
  const quote = getRandomElement(quotes)
  res.status(200).send({ quote })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})