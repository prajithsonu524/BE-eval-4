const Services = require('../services/collections');

const getAllCollections = async (req, res) => {
    try {
        const collections = await Services.getAllCollections();
        res.status(200).send(collections);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const createCollection = async (req, res) => {
    try {
        const { cont_id, col_data } = req.body;
        const newCollection = await Services.createCollection(cont_id, col_data);
        res.status(201).send(newCollection);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateCollection = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCollection = await Services.updateCollection(id, req.body);
        res.status(200).send(updatedCollection);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteCollection = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCollection = await Services.deleteCollection(id);
        res.status(200).send(deletedCollection);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection
};
