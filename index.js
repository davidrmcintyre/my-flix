const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/movies', (req, res) => {
    let myTenMovies = [
        { title: 'Kings of the Road (Im Lauf der Zeit)', director: 'Wim Wenders', year: 1976 },
        { title: 'Radio On', director: 'Chris Petit',  year: 1979 },
        { title: 'Vagabond', director: 'Agnès Varda', year: 1985 },
        { title: 'Leningrad Cowboys Go America', director: 'Aki Kaurismäki',  year: 1989 },
        { title: 'Locke', director: 'Steven Knight',  year: 2013 },
        { title: 'Morvern Callar', director: 'Lynne Ramsay',  year: 2002 },
        { title: 'The Passenger', director: 'Michelangelo Antonioni', year: 1975 },
        { title: 'Two Days, One Night', director: 'the Dardenne Brothers', year: 2014 },
        { title: 'Babylon', director: 'Damien Chazelle', year: 2022 },
        { title: 'Fight Club', director: 'David Fincher', year: 1999 }
      ];
      res.json(myTenMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });