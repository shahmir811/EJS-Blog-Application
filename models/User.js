'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			RoleId: DataTypes.INTEGER
		},
		{
			tableName: 'users',
			quoteIdentifiers: true
			// underscored: true
		}
	);
	User.associate = function(models) {
		User.hasMany(models.Post, { as: 'posts' });
		User.belongsTo(models.Role, { foreignKey: 'RoleId', as: 'role' });
	};
	return User;
};
