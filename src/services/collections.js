const { collection, content_types } = require('../../database/models');


const getAllCollections = async () => {
    return await collection.findAll({
        attributes: ['id', 'col_data'],
        include: [{
            model: content_types,

            attributes: ['id', 'name', 'fields'],
        }],
    });
};

const createCollection = async (cont_id, col_data) => {
    return await collection.create({
        cont_id: cont_id,
        col_data: col_data
    });
};

const updateCollection = async (id, col_data) => {
    return await collection.update({
        col_data: col_data
    }, {
        where: {
            id: id
        }
    });
};

const deleteCollection = async (id) => {
    return await collection.destroy({
        where: {
            id: id
        }
    });
};

module.exports = {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection
};