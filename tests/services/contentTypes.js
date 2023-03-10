const {
    getAllContentTypes,
    createContentType,
    contentTypeExists,
    getContentTypeById,
    updateFieldName,
    addField,
    deleteField
} = require('../../src/services/contentTypes');
//write all tests for contentTypes.js
describe('contentTypes service', () => {
    it('should get all content types', async () => {
        const contentTypes = await getAllContentTypes();
        expect(contentTypes).toEqual([]);
    }
    );
    it('should create a new content type', async () => {
        const contentType = await createContentType('test');
        expect(contentType).toEqual({ id: 1, name: 'test', fields: [] });
    }
    );
    it('should check if content type exists', async () => {
        const contentType = await contentTypeExists('test');
        expect(contentType).toEqual(true);
    }
    );
    it('should get content type by id', async () => {
        const contentType = await getContentTypeById(1);
        expect(contentType).toEqual({ id: 1, name: 'test', fields: [] });
    }
    );
    it('should update field name', async () => {
        const contentType = await updateFieldName(1, 'test', 'test', 'test');
        expect(contentType).toEqual([1]);
    }
    );
    it('should add a field', async () => {
        const contentType = await addField(1, 'test');
        expect(contentType).toEqual([1]);
    }
    );
    it('should delete a field', async () => {
        const contentType = await deleteField(1, 'test');
        expect(contentType).toEqual([1]);
    }
    );
});

