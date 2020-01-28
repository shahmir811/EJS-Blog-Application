'use strict';
module.exports = (sequelize, DataTypes) => {
	const PostsWithTags = sequelize.define(
		'PostsWithTags',
		{
			PostId: DataTypes.INTEGER,
			TagId: DataTypes.INTEGER
		},
		{
			tableName: 'postsWithTags'
		}
	);
	PostsWithTags.associate = function(models) {
		PostsWithTags.belongsTo(models.Post, { foreignKey: 'PostId' });
		PostsWithTags.belongsTo(models.Tag, { foreignKey: 'TagId' });
	};
	return PostsWithTags;
};
