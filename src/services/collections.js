const { collection, content_types } = require('../../database/models');


const getAllCollections = async () => {
    try {
        const collections = await collection.findAll({
            attributes: ['id', 'col_data'],
            include: [{
                model: content_types,

                attributes: ['id', 'name', 'fields'],
            }],
        });
        return collections;
    } catch (err) {
        console.log('Error in getAllCollections:', err);
        throw err;
    }
};

const createCollection = async (cont_id, col_data) => {
    try {
        const newCollection = await collection.create({
            cont_id: cont_id,
            col_data: col_data
        });
        return newCollection;
    } catch (err) {
        console.log('Error in createCollection:', err);
        throw err;
    }
};

const updateCollection = async (id, col_data) => {
    try {
        const updatedCollection = await collection.update({
            col_data: col_data
        }, {
            where: {
                id: id
            }
        });
        return updatedCollection;
    } catch (err) {
        console.log('Error in updateCollection:', err);
        throw err;
    }
};

const deleteCollection = async (id) => {
    try {
        const deletedCollection = await collection.destroy({
            where: {
                id: id
            }
        });
        return deletedCollection;
    } catch (err) {
        console.log('Error in deleteCollection:', err);
        throw err;
    }
};


module.exports = {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection
};