/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('content_types', [{
      name: 'Company',
      fields: ['name', 'address', 'phone', 'email', 'website', 'description'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Person',
      fields: ['First_Name', 'Last_Name', 'Age', 'Phone'],
      createdAt: new Date(),
      updatedAt: new Date()
    },]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('content_types', null, {});

  }
};
