const router = require('express').Router();

const { getAllCollections, createCollection, updateCollection, deleteCollection } = require('../controller/collections');

router.get('/getall', getAllCollections);
router.post('/create', createCollection);
router.put('/update/:id', updateCollection);
router.delete('/delete/:id', deleteCollection);


module.exports = router;