'use strict';
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'Role',
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING
		},
		{
			tableName: 'roles'
			// underscored: true
		}
	);
	Role.associate = function(models) {
		Role.hasMany(models.User, { as: 'users' });
	};
	return Role;
};
