'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				},
				unique: {
					args: true,
					msg: 'Email address already in use!'
				}
			},
			password: {
				type: Sequelize.STRING
			},
			RoleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					// User belongsTo Company 1:1
					model: 'roles',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
