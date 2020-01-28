'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'roles',
			[
				{
					name: 'admin',
					description: 'Handles all admin related tasks',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'customer',
					description: 'Able to make posts on this site',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('roles', null, {});
	}
};
