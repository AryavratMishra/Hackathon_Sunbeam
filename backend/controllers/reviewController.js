const { Review, Movie, Share, User } = require('../models');

exports.create = async (req, res) => {
  const { movieId, title, content, rating } = req.body;
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) return res.status(400).json({ msg: 'Movie does not exist' });

    const review = await Review.create({
      title, content, rating, movieId, userId: req.user.id
    });
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.mine = async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [{ model: Movie }]
  });
  res.json(reviews);
};

exports.update = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ msg: 'Not owner' });

    const { title, content, rating } = req.body;
    await review.update({ title, content, rating });
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ msg: 'Not owner' });

    // cascade configured on associations: deleting review will delete shares
    await review.destroy();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Allow owner to share this review with another user
exports.share = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { sharedWithUserId } = req.body;

    if (sharedWithUserId == req.user.id) return res.status(400).json({ msg: "Can't share with yourself" });

    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ msg: 'Not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ msg: 'Not owner' });

    const exists = await Share.findOne({ where: { reviewId, sharedWithUserId } });
    if (exists) return res.status(400).json({ msg: 'Already shared' });

    const share = await Share.create({ reviewId, sharedWithUserId });
    res.json(share);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
