/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      content_types.hasMany(models.collection, {
        foreignKey: 'id',
      });
    }
  }
  content_types.init({

    name: DataTypes.STRING,
    fields: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'content_types',
  });
  return content_types;
};