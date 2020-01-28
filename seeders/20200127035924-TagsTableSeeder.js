'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'tags',
			[
				{
					name: 'Politics',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Sports',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Basketball',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Football',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Cricket',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Education',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Mathematics',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Technology',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Computer Science',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Photography',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Health',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Showbiz',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'E-commerce',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Engineering',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Worker',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tags', null, {});
	}
};
