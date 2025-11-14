const sequelize = require('../config/db');
const Movie = require('../models/Movie');
require('../models');

const movies = [
  { title: 'The Shawshank Redemption', description: 'Two imprisoned men...', year: 1994 },
  { title: 'The Godfather', description: 'Crime family...', year: 1972 },
  { title: 'The Dark Knight', description: 'Batman vs Joker', year: 2008 },
  { title: 'Pulp Fiction', description: 'Interwoven crime stories', year: 1994 },
  { title: 'Forrest Gump', description: 'Life of Forrest', year: 1994 },
  { title: 'Inception', description: 'Dream layers', year: 2010 },
  { title: 'Fight Club', description: 'Underground club', year: 1999 },
  { title: 'Interstellar', description: 'Space mission', year: 2014 },
  { title: 'Parasite', description: 'Social satire', year: 2019 },
  { title: 'The Matrix', description: 'Simulation world', year: 1999 }
];

(async () => {
  try {
    await sequelize.sync({ alter: true });
    for (const m of movies) {
      await Movie.findOrCreate({ where: { title: m.title }, defaults: m });
    }
    console.log('Movies seeded');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
