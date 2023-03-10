/* eslint-disable no-unused-vars */
/* eslint-disable indent */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      collection.belongsTo(models.content_types, {
        foreignKey: 'cont_id',

      });
    }
  }
  collection.init({

    col_data: DataTypes.JSONB,
    cont_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collection',
  });
  return collection;
};