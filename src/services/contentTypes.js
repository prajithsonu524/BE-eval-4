/* eslint-disable no-prototype-builtins */

const { content_types, collection } = require('../../database/models');

const getAllContentTypes = async () => {
    try {
        return await content_types.findAll({});
    } catch (err) {
        throw new Error(`Error in getAllContentTypes: ${err.message}`);
    }
};

const createContentType = async (name, fields) => {
    try {
        return await content_types.create({
            name: name,
            fields: fields
        });
    } catch (err) {
        throw new Error(`Error in createContentType: ${err.message}`);
    }
};

const contentTypeExists = async (name) => {
    try {
        const contentType = await content_types.findOne({
            where: {
                name: name
            }
        });
        return contentType ? true : false;
    } catch (err) {
        throw new Error(`Error in contentTypeExists: ${err.message}`);
    }
};

const getContentTypeById = async (id) => {
    try {
        return await content_types.findOne({
            where: {
                id: id
            }
        });
    } catch (err) {
        throw new Error(`Error in getContentTypeById: ${err.message}`);
    }
};

const updateFieldName = async (id, name, oldField, newField) => {
    try {
        //updates only the name of content
        if (!oldField) {
            return await content_types.update({
                name: name,
            }, {
                where: {
                    id: id
                }
            });
        }
        //updates field by checking with collections table
        else {
            //`` check if content type has that field
            const contentType = await content_types.findOne({
                attributes: ['fields'],
                where: {
                    id: id
                }
            });
            const fields = contentType.dataValues.fields;
            if (fields.includes(newField)) {
                return 'FIELD_EXISTS_CONTENT_TYPE';
            }

            //check if collection exists
            const collections = await collection.findAll({
                where: {
                    cont_id: id,
                }
            });

            for (let i = 0; i < collections.length; i++) {
                const fields = collections[i].col_data;
                if (fields.hasOwnProperty(oldField)) {
                    console.log('inside if');
                    return 'FIELD_EXISTS_COLLECTION';
                }
            }

            //if not exists then update content type
            content_types.findOne({
                attributes: ['fields'],
                where: {
                    id: id
                }
            }).then((data) => {
                const fieldArray = data.dataValues.fields;
                const index = fieldArray.indexOf(oldField);
                fieldArray[index] = newField;
                //update content type
                content_types.update({
                    fields: fieldArray
                }, {
                    where: {
                        id: id
                    }
                });
            });

            collections.forEach(async (item) => {
                const fields = item.col_data;
                fields[newField] = '';
                await collection.update({
                    col_data: fields
                }, {
                    where: {
                        id: item.id
                    }
                });
            });
        }
    } catch (err) {
        throw new Error(`Error in updateFieldName: ${err.message}`);
    }
};
const deleteField = async (id, field) => {
    try {
        const contentType = await content_types.findOne({
            attributes: ['fields'],
            where: {
                id: id
            }
        });
        const fields = contentType.dataValues.fields;
        console.log(fields);
        delete fields.splice(fields.indexOf(field));
        console.log(fields);
        await content_types.update({
            fields: fields
        }, {
            where: {
                id: id
            }
        });

        const collections = await collection.findAll({
            where: {
                cont_id: id,
            }
        });
        for (let i = 0; i < collections.length; i++) {
            const fields = collections[i].col_data;
            delete fields[field];
            await collection.update({
                col_data: fields
            }, {
                where: {
                    id: collections[i].id
                }
            });
        }
        return true;
    } catch (error) {
        console.error('Error in deleteField:', error);
        throw error;
    }
};

const addField = async (id, field) => {
    try {
        const contentType = await content_types.findOne({
            attributes: ['fields'],
            where: {
                id: id
            }
        });
        const fields = contentType.dataValues.fields;
        if (fields.includes(field)) {
            return 'FIELD_EXISTS_CONTENT_TYPE';
        }
        fields.push(field);
        //update content type
        await content_types.update({
            fields: fields
        }, {
            where: {
                id: id
            }
        });
        const collections = await collection.findAll({
            where: {
                cont_id: id,
            }
        });
        collections.forEach(async (item) => {
            const fields = item.col_data;
            fields[field] = '';
            await collection.update({
                col_data: fields
            }, {
                where: {
                    id: item.id
                }
            });
        });
        return true;
    } catch (error) {
        console.error('Error in addField:', error);
        throw error;
    }
};
module.exports = {
    getAllContentTypes,
    createContentType,
    contentTypeExists,
    getContentTypeById,
    updateFieldName,
    addField,
    deleteField
};

// try putting repeptive code in utils
