/* eslint-disable no-prototype-builtins */
const { content_types, collection } = require('../../database/models');

const getAllContentTypes = async () => {
    return await content_types.findAll({});
};

const createContentType = async (name, fields) => {
    return await content_types.create({
        name: name,
        fields: fields
    });
};


const contentTypeExists = async (name) => {
    const contentType = await content_types.findOne({
        where: {
            name: name
        }
    });
    return contentType ? true : false;
};

const getContentTypeById = async (id) => {
    return await content_types.findOne({
        where: {
            id: id
        }
    });
};

const updateFieldName = async (id, name, oldField, newField) => {
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
        content_types.findOne(
            {
                attributes: ['fields'],
                where: {
                    id: id
                }
            }

        ).then((data) => {

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
        }
        );



    }
};

const deleteField = async (id, field) => {
    //check if collection exists
    //remove in content type
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
    content_types.update({
        fields: fields
    }, {
        where: {
            id: id
        }
    });



    //remove in collection
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


};

const addField = async (id, field) => {
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
    content_types.update({
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
    }
    );
    return true;




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
