const { Share, Review, User, Movie } = require('../models');

exports.received = async (req, res) => {
  try {
    const shares = await Share.findAll({
      where: { sharedWithUserId: req.user.id },
      include: [{
        model: Review,
        include: [{ model: User, attributes: ['id','username'] }, { model: Movie }]
      }],
      order: [['createdAt','DESC']]
    });
    res.json(shares);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
