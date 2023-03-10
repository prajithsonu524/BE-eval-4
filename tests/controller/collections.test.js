//test the collections controller
// Compare this snippet from tests/controller/collections.test.js:
const { getAllCollections, createCollection, updateCollection, deleteCollection } = require('../../src/controller/collections');
const Services = require('../../src/services/collections');
describe('collections controller', () => {
    it('should get all collections', async () => {
        jset.spyOn(Services, 'getAllCollections').mockResolvedValueOnce([]);
        const req = {};
        const res = await getAllCollections();
        expect(res.sendStatus).toBe(200);
        expect(res.body).toEqual([]);
    });
    it('should create a new collection', async () => {
        jest.spyOn(Services, 'createCollection').mockResolvedValueOnce({ id: 1, col_data: [], cont_id: 1 });
        const req = {
            body: {
                col_data: [],
                cont_id: 1
            }
        };
        const res = await createCollection(req);
        expect(res.sendStatus).toBe(201);
        expect(res.body).toEqual({ id: 1, col_data: [], cont_id: 1 });
    })
    it('should update a collection', async () => {
        jest.spyOn(Services, 'updateCollection').mockResolvedValueOnce({ id: 1, col_data: [], cont_id: 1 });
        const req = {
            params: {
                id: 1
            },
            body: {
                col_data: [],
                cont_id: 1
            }
        };
        const res = await updateCollection(req);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: 1, col_data: [], cont_id: 1 });
    })
    it('should delete a collection', async () => {

        jest.spyOn(Services, 'deleteCollection').mockResolvedValueOnce({ id: 1, col_data: [], cont_id: 1 });
        const req = {
            params: {
                id: 1
            }
        };
        const res = await deleteCollection(req);
        expect(res.sendStatus).toBe(200);
        expect(res.body).toEqual({ id: 1, col_data: [], cont_id: 1 });
    })

    //it should return Ok if collection is deleted






});

