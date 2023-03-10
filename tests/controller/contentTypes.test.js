const Services = require('../../src/services/contentTypes');
const { createContentType, updateFieldName, addField, deleteField } = require('../../src/controller/contentTypes');
const { getAllContentTypes } = require('../../src/controller/contentTypes');
const { contentTypeExists } = require('../../src/services/contentTypes');


describe('Content Types', () => {
    it('should get all content types', async () => {
        jest.spyOn(Services, 'getAllContentTypes').mockResolvedValueOnce([]);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getAllContentTypes(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
    it('should create a new content type', async () => {
        jest.spyOn(Services, 'contentTypeExists').mockResolvedValueOnce(false);
        jest.spyOn(Services, 'createContentType').mockResolvedValueOnce({ id: 1, name: 'test', fields: [] });
        const req = {
            body: {
                name: 'test',
                fields: []
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createContentType(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should not create a new content type if name already exists', async () => {
        jest.spyOn(Services, 'contentTypeExists').mockResolvedValueOnce(true);
        const req = {
            body: {
                name: 'test',
                fields: []
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createContentType(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should update a content type', async () => {
        jest.spyOn(Services, 'getContentTypeById').mockResolvedValueOnce({ id: 1, name: 'test', fields: [] });
        jest.spyOn(Services, 'updateFieldName').mockResolvedValueOnce({ id: 1, name: 'test', fields: [] });
        const req = {
            params: {
                id: 1
            },
            body: {
                name: 'test',
                oldField: 'old',
                newField: 'new'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await updateFieldName(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should add a field to a content type', async () => {
        jest.spyOn(Services, 'addField').mockResolvedValueOnce({ id: 1, name: 'test', fields: [] });
        const req = {
            params: {
                id: 1
            },
            body: {
                field: 'new'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await addField(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should delete a field from a content type', async () => {
        jest.spyOn(Services, 'deleteField').mockResolvedValueOnce({ id: 1, name: 'test', fields: [] });
        const req = {
            params: {
                id: 1
            },
            body: {
                field: 'new'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await deleteField(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should update if content type is not found', async () => {
        jest.spyOn(Services, 'getContentTypeById').mockResolvedValueOnce(null);
        const req = {
            params: {
                id: 1
            },
            body: {
                name: 'test',
                oldField: 'old',
                newField: 'new'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await updateFieldName(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
    }
    );
    it('should not update a field name if it already exists', async () => {
        jest.spyOn(Services, 'getContentTypeById').mockResolvedValueOnce({ id: 1, name: 'test', fields: ['old', 'new'] });
        const req = {
            params: {
                id: 1
            },
            body: {
                name: 'test',
                oldField: 'old',
                newField: 'new'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await updateFieldName(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }
    );


});