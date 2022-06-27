const quoteInput = document.getElementById('quote-text'),
  name = document.getElementById('quote-name');

fetch('https://animechan.vercel.app/api/random')
  .then((response) => response.json())
  .then((quote) => {
    quoteInput.textContent = `'${quote.quote}'`;
    name.textContent = `~${quote.character}~`;
  });
