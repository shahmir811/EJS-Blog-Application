'use strict';
module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			path: DataTypes.STRING,
			UserId: DataTypes.INTEGER
		},
		{
			tableName: 'posts'
			// underscored: true
		}
	);
	Post.associate = function(models) {
		Post.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
		Post.belongsToMany(models.Tag, {
			through: 'postsWithTags',
			foreignKey: 'PostId',
			as: 'tags'
		});
	};
	return Post;
};
