'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('postsWithTags', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			PostId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					// Post hasMany Tags n:n
					model: 'posts',
					key: 'id'
				}
			},
			TagId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					// Tag hasMany posts n:n
					model: 'tags',
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
		return queryInterface.dropTable('postsWithTags');
	}
};
