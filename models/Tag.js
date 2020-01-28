'use strict';
module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		'Tag',
		{
			name: DataTypes.STRING
		},
		{
			tableName: 'tags'
		}
	);
	Tag.associate = function(models) {
		Tag.belongsToMany(models.Post, {
			through: 'postsWithTags',
			foreignKey: 'TagId',
			as: 'posts'
		});
	};
	return Tag;
};
