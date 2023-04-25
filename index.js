const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

//Middleware

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

//Sample users

let users = [
  {
    id: 1,
    name: 'davidrmcintyre',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'smgruber',
    favoriteMovies: []
  },
  {
    id: 3,
    name: 'deleteme',
    favoriteMovies: ['Locke']
  }
];

//Array of my ten chosen movies.

let myMovies = [
  {
    "Title": "Kings of the Road",
    "Description": "The film is about a projection-equipment repair mechanic named Bruno Winter (Rüdiger Vogler), who meets the depressed Robert Lander (Hanns Zischler), who has just been through a break-up with his wife, after he drives his car into a river in a half-hearted suicide attempt.",
    "Director": {
        "firstName": "Wim",
        "lastName": "Wenders",
        "Bio": "Wim Wenders is a German filmmaker, playwright, author, and photographer",
        "dateOfBirth": 1945
    },
    "Year": 1976,
    "Genres": [
        {
            "Name": "Road-Movie",
            "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
        }
    ],
    "ImageURL": "https://www.themoviedb.org/t/p/w1280/x2WvLtMJZ6OPz3GEhbEE1V29Pis.jpg",
    "Featured": true
},

   {
    "Title": "Radio On",
    "Description": "In 1970s Britain, a man drives from London to Bristol to investigate his brothers death, and the purpose of his trip is offset by his encounters with a series of odd people.",
    "Director": {
        "firstName": "Chris",
        "lastName": "Petit",
        "Bio": "Chris Petit is an English novelist and filmmaker. During the 1970's he was the film editor for Time Out and wrote for Melody Maker.",
        "dateOfBirth": 1949
    },
    "Year": 1979,
    "Genres": [
        {
            "Name": "Drama",
            "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
        },
        {
            "Name": "Road-Movie",
            "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
        }
    ],
    "ImageURL": "https://www.themoviedb.org/t/p/w1280/jaKTAV3wuHRklubTFVPNgPOGeIs.jpg",
    "Featured": false
},

    {
      "Title": "Vagabond",
      "Description": "A young woman's body is found frozen in a ditch. Through flashbacks and interviews, we see the events that led to her inevitable death.",
      "Director": {
          "firstName": "Agnes",
          "lastName": "Varda",
          "Bio": "Agnes Varda was a Belgian-born French film director, screenwriter, photographer, and artist. Her pioneering work was central to the development of the widely influential French New Wave film movement of the 1950s and 1960s.",
          "dateOfBirth": 1928,
          "dateOfDeath": 2019
      },
      "Year": 1985,
      "Genres": [
          {
              "Name": "Drama",
              "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
          },
          {
              "Name": "Road Movie",
              "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
          }
      ],
      "ImageURL": "https://www.themoviedb.org/t/p/w1280/2KFfwiPct1hwqi9dkKqoom0BenC.jpg",
      "Featured": false
  },

    {
      "Title": "Leningrad Cowboys Go America",
      "Description": "Siberian rock band Leningrad Cowboys go to the USA in pursuit of fame.",
      "Director": {
          "firstName": "Aki",
          "lastName": "Kaurismäki",
          "Bio": "Aki Kaurismäki is a Finnish film director and screenwriter. He has been described as Finland's best known film director.",
          "dateOfBirth": 1957
      },
      "Year": 1989,
      "Genres": [
          {
              "Name": "Comedy",
              "Description": "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through the amusement."
          },
          {
              "Name": "Road Movie",
              "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
          }
      ],
      "ImageURL": "https://www.themoviedb.org/t/p/w1280/6lJj3w5ebOkrsNx6sJXyNuWDJIB.jpg",
      "Featured": false
  },

  {
    "Title": "Locke",
    "Description": "Ivan Locke, a dedicated family man and successful construction manager, receives a phone call on the eve of the biggest challenge of his career that sets in motion a series of events that threaten his carefully cultivated existence.",
    "Director": {
        "firstName": "Steven",
        "lastName": "Knight",
        "Bio": "Steven Knight is a British screenwriter and film director. He is best known for screenplays he wrote for the films Dirty Pretty Things (2002) and Eastern Promises (2007), and also directed as well as written the film Locke (2013).",
        "dateOfBirth": 1959
    },
    "Year": 2013,
    "Genres": [
        {
            "Name": "Drama",
            "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
        },
        {
            "Name": "Road Movie",
            "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
        }
    ],
    "ImageUrl": "https://www.themoviedb.org/t/p/w1280/mZTMFDk5VRQuvkJaCFFAXFV65G6.jpg",
    "Featured": false
},
    
    {
      "Title": "Morvern Callar",
      "Description": "After her beloved boyfriend's suicide, a mourning supermarket worker and her best friend hit the road in Scotland, but find that grief is something that you can't run away from forever.",
      "Director": {
          "firstName": "Lynne",
          "lastName": "Ramsay",
          "Bio": "Lynne Ramsay was born on 5 December 1969 in Glasgow, Strathclyde, Scotland, UK. She is a director and writer, known for We Need to Talk About Kevin (2011), You Were Never Really Here (2017) and Ratcatcher (1999).",
          "dateOfBirth": 1969
      },
      "Year": 2002,
      "Genres": [
          {
              "Name": "Drama",
              "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
          },
          {
              "Name": "Road Movie",
              "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
          }
      ],
      "ImageUrl": "https://www.themoviedb.org/t/p/w1280/qcX86XKhPH4Q02OcKv4cnbrmFOn.jpg",
      "Featured": false
  },

    {
      "Title": "The Passenger",
      "Description": "Unable to find the war he's been asked to cover, a frustrated war correspondent takes the risky path of co-opting the identity of a dead arms-deal acquaintance.",
      "Director": {
          "firstName": "Michelangelo",
          "lastName": "Antonioni",
          "Bio": "Together with Fellini, Bergman and Kurosawa, Michelangelo Antonioni is credited with defining the modern art film.",
          "dateOfBirth": 1912,
          "dateOfDeath": 2007
      },
      "Year": 1975,
      "Genres": [
          {
              "Name": "Drama",
              "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
          },
          {
              "Name": "Road Movie",
              "Description": "A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives."
          }
      ],
      "ImageURL": "https://www.themoviedb.org/t/p/w1280/k3Oceb7EJX4OJHJxqbmP0pWjZ89.jpg",
      "Featured": false  },

    {
      "Title": "Two Days, One Night",
      "Description": "Sandra is a young woman who has only one weekend to convince her colleagues they must give up their bonuses in order for her to keep her job — not an easy task in this economy.",
      "Director": {
          "firstName": "Jean-Pierre & Luc",
          "lastName": "Dardenne",
          "Bio": "Brothers Jean-Pierre Dardenne (born 21 April 1951) and Luc Dardenne (born 10 March 1954), collectively referred to as the Dardenne brothers, are a Belgian filmmaking duo. They write, produce, and direct their films together.",
          "dateOfBirth": 3905
      },
      "Year": 2014,
      "Genres": [{
          "Name": "Drama",
          "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
      },
        {
          "Name": ""
      }],
      "ImageURL": "https://www.themoviedb.org/t/p/w1280/na05HMiEEftqzBFnBOtqAgAr7zz.jpg",
      "Featured": false
  },
    {
      "Title": "Babylon",
      "Description": "A tale of outsized ambition and outrageous excess, tracing the rise and fall of multiple characters in an era of unbridled decadence and depravity during Hollywood's transition from silent films and to sound films in the late 1920s.",
      "Director": {
          "firstName": "Damien",
          "lastName": "Chazelle",
          "Bio": "Damien Sayre Chazelle (born January 19, 1985) is a French-American film director, screenwriter, and producer. He is known for directing the films Whiplash (2014), La La Land (2016), First Man (2018), and Babylon (2022).",
          "dateOfBirth": 1985
      },
      "Year": 2022,
      "Genres": [
          {
              "Name": "Comedy",
              "Description": "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through the amusement."
          },
          {
              "Name": "Drama",
              "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
          }
      ],
      "ImageURL": "https://www.themoviedb.org/t/p/w1280/wjOHjWCUE0YzDiEzKv8AfqHj3ir.jpg",
      "Featured": false
  },

    {
      "Title": "Fight Club",
      "Description": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
      "Director": {
          "firstName": "David",
          "lastName": "Fincher",
          "Bio": "David Andrew Leo Fincher (born August 28, 1962) is an American film director. His films, mostly psychological thrillers and biographical dramas, have received 40 nominations at the Academy Awards, including three for him as Best Director.",
          "dateOfBirth": 1962
      },
      "Year": 1999,
      "Genres": [
          {
              "Name": "Comedy",
              "Description": "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through the amusement."
          },
          {
              "Name": "Drama",
              "Description": "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience."
          }
      ],
      "ImageURL": "https://www.themoviedb.org/movie/550-fight-club",
      "Featured": false
  }
];




app.get('/', (req, res) => {
  res.send('Welcome to my movie API!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('documentation.html', { root: 'public' });
});

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name){
    newUser.id = uuid.v4();
    newUser.favoriteMovies = [];
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('Users need names')
  }
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id);
  if(user){
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No such user')
  }
});

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;


  let user = users.find( user => user.id == id);
  if(user){
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}\'s array`);
  } else {
    res.status(400).send('No such user')
  }
});

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;


  let user = users.find( user => user.id == id);
  if(user){
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}\'s array`);
  } else {
    res.status(400).send('No such user')
  }
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;


  let user = users.find( user => user.id == id);
  if(user){
    users = users.filter(user => user.id != id);
    //res.json(users);
    res.status(200).send(`user ${id} has been deleted.`);
  } else {
    res.status(400).send('No such user')
  }
});

// READ
app.get('/movies', (req, res) => {
    res.status(200).json(myMovies);
});

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = myMovies.find(movie => movie.Title === title);
  if (movie) {
      res.status(200).json(movie);
  } else {
      res.status(404).send('No such movie.')
  }
});

// READ
/*app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = myMovies.find(movie => movie.Genres.Name === genreName ).Genres;
  if (genre) {
      res.status(200).json(genre);
  } else {
    res.status(404).send(`No such genre`)
  }
}); */

app.get('/movies/genre/:genreName', (req, res) => {
  const genreName = req.params.genreName;
  const movies = myMovies.filter((movie) =>
    movie.Genres.some((genre) => genre.Name === genreName)
  );
  if (movies.length > 0) {
    res.status(200).json(movies);
  } else {
    res.status(404).send(`No movies found with genre "${genreName}"`);
  }
});





// READ
app.get('/movies/director/:name', (req, res) => {
  const directorName = req.params.name;
  const director = myMovies.filter(movie => movie.Director.firstName.toLowerCase() === directorName.toLowerCase() || movie.Director.lastName.toLowerCase() === directorName.toLowerCase())[0].Director;
  if (director) {
    res.json(director);
  } else {
    res.status(404).send('Director not found.');
  }
});





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });