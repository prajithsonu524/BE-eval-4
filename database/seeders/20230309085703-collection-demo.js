/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('collections', [{
      col_data: JSON.stringify({
        name: 'MCk',
        address: '1234',
        phone: '1234567890',
        email: 'mck@gmail.com',
        website: 'www.mck.com',
        description: 'this is a description'
      }),
      cont_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      col_data: JSON.stringify({
        First_Name: 'John',
        Last_Name: 'Doe',
        Age: '30',
        Phone: '1234567890'
      }),
      cont_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('collections', null, {});

  }
};
