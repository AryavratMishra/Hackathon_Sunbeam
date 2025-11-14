const User = require('./User');
const Movie = require('./Movie');
const Review = require('./Review');
const Share = require('./Share');

// Associations
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

Movie.hasMany(Review, { foreignKey: 'movieId', onDelete: 'CASCADE' });
Review.belongsTo(Movie, { foreignKey: 'movieId' });

// Shares: who it is shared with
Review.hasMany(Share, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
Share.belongsTo(Review, { foreignKey: 'reviewId' });

User.hasMany(Share, { foreignKey: 'sharedWithUserId', as: 'receivedShares', onDelete: 'CASCADE' });
Share.belongsTo(User, { foreignKey: 'sharedWithUserId', as: 'sharedWith' });

module.exports = { User, Movie, Review, Share };
