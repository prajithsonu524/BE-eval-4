
const Services = require('../services/contentTypes');

const getAllContentTypes = async (req, res) => {
    try {
        const contentTypes = await Services.getAllContentTypes();
        res.status(200).json(contentTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching content types' });
    }
};

//1. Create a new content type
const createContentType = async (req, res) => {
    try {
        const { name, fields } = req.body;
        const nameExists = await Services.contentTypeExists(name);
        if (nameExists) {
            return res.status(400).json({ message: 'Content type with this name already exists' });
        }
        const newContentType = await Services.createContentType(name, fields);
        res.status(201).json({ ...newContentType, message: 'Content type created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating content type' });
    }
};

//2. Update a content type
const updateFieldName = async (req, res) => {
    const { name, oldField, newField } = req.body;
    const { id } = req.params;
    try {
        const contentType = await Services.getContentTypeById(id);
        if (!contentType) {
            return res.status(404).json({ message: 'Content type not found' });
        }

        const updatedFieldName = await Services.updateFieldName(id, name, oldField, newField);

        if (updatedFieldName) {
            console.log('field exists for a collection hence cant update');
            return res.status(200).json({ message: 'field exists for a collection hence cant update' });
        }
        if (updatedFieldName === 'FIELD_EXISTS_CONTENT_TYPE') {
            return res.status(200).json({ message: 'field exists for a content type hence cant update' });
        }
        res.status(200).json({ ...updateFieldName, message: 'Content type updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating field name' });
    }
};

const addField = async (req, res) => {
    try {
        const { id } = req.params;
        const { field } = req.body;
        const added = await Services.addField(id, field);
        if (added === 'FIELD_EXISTS_CONTENT_TYPE') {
            return res.status(400).json({ message: 'field exists for a content type hence cant update' });
        }
        if (added) {
            return res.status(200).json({ message: 'field added successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding field' });
    }
};

const deleteField = async (req, res) => {
    try {
        const { id } = req.params;
        const { field } = req.body;
        const deleted = await Services.deleteField(id, field);
        if (deleted) {
            return res.status(200).json({ message: 'field deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting field' });
    }
};



module.exports = {
    getAllContentTypes,
    createContentType,
    updateFieldName,
    addField,
    deleteField
};