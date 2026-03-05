// data/movies.js
export const MOVIES = [
  { id: "1", title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola" },
  { id: "2", title: "Pulp Fiction", genre: "Crime", year: 1994, director: "Quentin Tarantino" },
  { id: "3", title: "Goodfellas", genre: "Crime", year: 1990, director: "Martin Scorsese" },
  { id: "4", title: "Inception", genre: "Sci-Fi", year: 2010, director: "Christopher Nolan" },
  { id: "5", title: "Interstellar", genre: "Sci-Fi", year: 2014, director: "Christopher Nolan" },
  { id: "6", title: "Blade Runner 2049", genre: "Sci-Fi", year: 2017, director: "Denis Villeneuve" },
  { id: "7", title: "The Dark Knight", genre: "Action", year: 2008, director: "Christopher Nolan" },
  { id: "8", title: "Mad Max: Fury Road", genre: "Action", year: 2015, director: "George Miller" },
  { id: "9", title: "John Wick", genre: "Action", year: 2014, director: "Chad Stahelski" },
  { id: "10", title: "The Shining", genre: "Horror", year: 1980, director: "Stanley Kubrick" },
  { id: "11", title: "Hereditary", genre: "Horror", year: 2018, director: "Ari Aster" },
  { id: "12", title: "Get Out", genre: "Horror", year: 2017, director: "Jordan Peele" },
  { id: "13", title: "Schindler's List", genre: "Drama", year: 1993, director: "Steven Spielberg" },
  { id: "14", title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont" },
  { id: "15", title: "Parasite", genre: "Drama", year: 2019, director: "Bong Joon-ho" },
  { id: "16", title: "Spirited Away", genre: "Animation", year: 2001, director: "Hayao Miyazaki" },
  { id: "17", title: "Your Name", genre: "Animation", year: 2016, director: "Makoto Shinkai" },
  { id: "18", title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, director: "Wes Anderson" },
  { id: "19", title: "Superbad", genre: "Comedy", year: 2007, director: "Greg Mottola" },
  { id: "20", title: "Amélie", genre: "Romance", year: 2001, director: "Jean-Pierre Jeunet" },
];

export const GENRES = [...new Set(MOVIES.map((m) => m.genre))];

export const GENRE_COLORS = {
  Crime: "#e05252",
  "Sci-Fi": "#5287e0",
  Action: "#e09452",
  Horror: "#9452e0",
  Drama: "#52c4e0",
  Animation: "#52e08a",
  Comedy: "#e0d052",
  Romance: "#e052b0",
};