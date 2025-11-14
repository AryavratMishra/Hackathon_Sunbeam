const { Movie, Review, User } = require('../models');

exports.list = async (req, res) => {
  const movies = await Movie.findAll({ order: [['title','ASC']] });
  res.json(movies);
};

exports.get = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ msg: 'Not found' });
  res.json(movie);
};

exports.reviewsForMovie = async (req, res) => {
  const reviews = await Review.findAll({
    where: { movieId: req.params.id },
    include: [{ model: User, attributes: ['id','username'] }],
    order: [['createdAt','DESC']]
  });
  res.json(reviews);
};
