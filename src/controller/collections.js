const Services = require('../services/collections');

const getAllCollections = async (req, res) => {
    const collections = await Services.getAllCollections();
    res.status(200).send(collections);
};
const createCollection = async (req, res) => {
    const { cont_id, col_data } = req.body;
    const newCollection = await Services.createCollection(cont_id, col_data);
    res.status(201).send(newCollection);
};
const updateCollection = async (req, res) => {
    const id = req.params.id;
    const updatedCollection = await Services.updateCollection(id, req.body);
    res.status(200).send(updatedCollection);
};
const deleteCollection = async (req, res) => {
    const id = req.params.id;
    const deletedCollection = await Services.deleteCollection(id);
    res.sendStatus(200).send(deletedCollection);
};
module.exports = {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection
};